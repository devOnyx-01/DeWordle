import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { IngestedEventDto } from './dto/ingested-event.dto';
import { EventProcessorService } from './processors/event-processor.service';
import { EventNormalizerService } from './processors/event-normalizer.service';
import { CursorService } from './projections/cursor.service';
import { compareEventsByCursor } from './processors/event-ordering.util';
import { INDEXER_STREAM_CORE_GAME } from './indexer.constants';

/** Observability counters for indexer health metrics. */
export interface IndexerMetrics {
  ingestedTotal: number;
  replaySkips: number;
  projectionErrors: number;
  pollCycles: number;
  lastCursorLedger: number;
}

export interface IndexerLagSnapshot {
  network: string;
  streamKey: string;
  cursor: {
    lastLedger: number;
    lastTxHash: string;
    lastEventIndex: number;
    updatedAt?: Date;
  };
  lastProcessedTxHash: string;
  networkLatestLedger: number | null;
  lagLedgers: number | null;
  replaySkips: number;
  ingestedTotal: number;
  projectionErrors: number;
  pollCycles: number;
}

@Injectable()
export class IndexerService {
  private readonly logger = new Logger(IndexerService.name);

  readonly metrics: IndexerMetrics = {
    ingestedTotal: 0,
    replaySkips: 0,
    projectionErrors: 0,
    pollCycles: 0,
    lastCursorLedger: 0,
  };

  constructor(
    private readonly eventProcessor: EventProcessorService,
    private readonly eventNormalizer: EventNormalizerService,
    private readonly cursorService: CursorService,
    private readonly configService: ConfigService,
  ) {}

  async ingest(event: IngestedEventDto) {
    const t0 = Date.now();
    try {
      await this.eventProcessor.process(event);
      await this.cursorService.checkpoint(
        event.network,
        INDEXER_STREAM_CORE_GAME,
        event.ledger,
        event.txHash,
        event.eventIndex,
      );
      this.metrics.ingestedTotal++;
      this.metrics.lastCursorLedger = event.ledger;
      this.logger.log({
        msg: 'indexer.ingest.ok',
        topic: event.topic,
        ledger: event.ledger,
        txHash: event.txHash,
        eventIndex: event.eventIndex,
        latencyMs: Date.now() - t0,
      });
    } catch (err) {
      this.metrics.projectionErrors++;
      this.logger.error({
        msg: 'indexer.ingest.error',
        topic: event.topic,
        ledger: event.ledger,
        error: err instanceof Error ? err.message : String(err),
      });
      throw err;
    }
  }

  async getLagSnapshot(): Promise<IndexerLagSnapshot> {
    const network =
      (this.configService.get<string>('SOROBAN_NETWORK') as 'testnet' | 'mainnet') ||
      'testnet';
    const rpcUrl = this.configService.get<string>('SOROBAN_RPC_URL');
    const cursor = await this.cursorService.getOrCreate(network, INDEXER_STREAM_CORE_GAME);

    let networkLatestLedger: number | null = null;
    if (rpcUrl) {
      networkLatestLedger = await this.fetchLatestLedger(rpcUrl);
    }

    return {
      network,
      streamKey: INDEXER_STREAM_CORE_GAME,
      cursor: {
        lastLedger: cursor.lastLedger,
        lastTxHash: cursor.lastTxHash,
        lastEventIndex: cursor.lastEventIndex,
        updatedAt: cursor.updatedAt,
      },
      lastProcessedTxHash: cursor.lastTxHash,
      networkLatestLedger,
      lagLedgers:
        networkLatestLedger === null ? null : Math.max(networkLatestLedger - cursor.lastLedger, 0),
      replaySkips: this.metrics.replaySkips,
      ingestedTotal: this.metrics.ingestedTotal,
      projectionErrors: this.metrics.projectionErrors,
      pollCycles: this.metrics.pollCycles,
    };
  }

  async poll(): Promise<number> {
    const network =
      (this.configService.get<string>('SOROBAN_NETWORK') as 'testnet' | 'mainnet') ||
      'testnet';
    const rpcUrl = this.configService.get<string>('SOROBAN_RPC_URL');
    const contractId = this.configService.get<string>('SOROBAN_CORE_GAME_CONTRACT_ID');

    if (!rpcUrl || !contractId) {
      this.logger.warn('SOROBAN_RPC_URL or SOROBAN_CORE_GAME_CONTRACT_ID not set — poll skipped');
      return 0;
    }

    const cursor = await this.cursorService.getOrCreate(network, INDEXER_STREAM_CORE_GAME);
    this.metrics.pollCycles++;
    this.metrics.lastCursorLedger = cursor.lastLedger;

    this.logger.log({
      msg: 'indexer.poll.tick',
      network,
      rpc: rpcUrl ?? 'unset',
      contract: contractId ?? 'unset',
      cursorLedger: cursor.lastLedger,
      cursorTxHash: cursor.lastTxHash,
      cursorEventIndex: cursor.lastEventIndex,
      metrics: { ...this.metrics },
    });
    this.logger.debug(
      `poll network=${network} rpc=${rpcUrl} contract=${contractId} cursor=${cursor.lastLedger}:${cursor.lastTxHash}:${cursor.lastEventIndex}`,
    );

    const rawEvents = await this.fetchEvents(rpcUrl, contractId, cursor.lastLedger);

    const normalized = rawEvents
      .map((raw) => this.eventNormalizer.normalize(network, raw))
      .filter((e) => this.eventNormalizer.isValid(e))
      .sort(compareEventsByCursor);

    let ingested = 0;
    for (const event of normalized) {
      await this.ingest(event);
      ingested++;
    }

    this.logger.log(`poll complete ingested=${ingested}`);
    return ingested;
  }

  /** Fetches raw Soroban events from RPC after the given ledger cursor. Overridable for testing. */
  async fetchEvents(
    rpcUrl: string,
    contractId: string,
    afterLedger: number,
  ): Promise<Record<string, unknown>[]> {
    const body = {
      jsonrpc: '2.0',
      id: 1,
      method: 'getEvents',
      params: {
        startLedger: afterLedger > 0 ? afterLedger + 1 : 1,
        filters: [{ type: 'contract', contractIds: [contractId] }],
        pagination: { limit: 200 },
      },
    };

    const response = await axios.post<{
      result?: { events?: Record<string, unknown>[] };
    }>(rpcUrl, body, { timeout: 10_000 });

    return response.data?.result?.events ?? [];
  }

  async fetchLatestLedger(rpcUrl: string): Promise<number> {
    const response = await axios.post<{
      result?: { latestLedger?: number };
    }>(
      rpcUrl,
      {
        jsonrpc: '2.0',
        id: 1,
        method: 'getHealth',
      },
      { timeout: 10_000 },
    );

    return response.data?.result?.latestLedger ?? 0;
  }

  recordReplaySkip(ledger: number, txHash: string, eventIndex: number) {
    this.metrics.replaySkips++;
    this.logger.warn({
      msg: 'indexer.replay.skip',
      ledger,
      txHash,
      eventIndex,
      totalSkips: this.metrics.replaySkips,
    });
  }
}
