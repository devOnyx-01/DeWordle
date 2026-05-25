import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IngestedEventDto } from './dto/ingested-event.dto';
import { EventProcessorService } from './processors/event-processor.service';
import { CursorService } from './projections/cursor.service';
import { INDEXER_STREAM_CORE_GAME } from './indexer.constants';

@Injectable()
export class IndexerService {
  private readonly logger = new Logger(IndexerService.name);

  constructor(
    private readonly eventProcessor: EventProcessorService,
    private readonly cursorService: CursorService,
    private readonly configService: ConfigService,
  ) {}

  async ingest(event: IngestedEventDto) {
    await this.eventProcessor.process(event);
    await this.cursorService.checkpoint(
      event.network,
      INDEXER_STREAM_CORE_GAME,
      event.ledger,
      event.txHash,
      event.eventIndex,
    );
  }

  async poll() {
    const network =
      (this.configService.get<string>('SOROBAN_NETWORK') as 'testnet' | 'mainnet') ||
      'testnet';
    const rpcUrl = this.configService.get<string>('SOROBAN_RPC_URL');
    const contractId = this.configService.get<string>('SOROBAN_CORE_GAME_CONTRACT_ID');

    const cursor = await this.cursorService.getOrCreate(network, INDEXER_STREAM_CORE_GAME);

    this.logger.debug(
      `Indexer poll scaffold network=${network} rpc=${rpcUrl ?? 'unset'} contract=${contractId ?? 'unset'} cursor=${cursor.lastLedger}:${cursor.lastTxHash}:${cursor.lastEventIndex}`,
    );

    // Phase 2 scaffold:
    // 1. Fetch events after cursor
    // 2. Normalize and validate each event
    // 3. Ingest in deterministic order (ledger, txHash, eventIndex)
    // 4. Checkpoint after each successful projection
  }
}
