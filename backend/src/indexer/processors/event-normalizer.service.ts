import { Injectable } from '@nestjs/common';
import { IngestedEventDto } from '../dto/ingested-event.dto';

interface RawSorobanEvent {
  contractId?: string;
  topic?: string;
  txHash?: string;
  ledger?: number;
  eventIndex?: number;
  payload?: Record<string, unknown>;
}

@Injectable()
export class EventNormalizerService {
  normalize(network: 'testnet' | 'mainnet', raw: RawSorobanEvent): IngestedEventDto {
    return {
      network,
      contractId: String(raw.contractId ?? ''),
      topic: String(raw.topic ?? '').trim().toLowerCase(),
      txHash: String(raw.txHash ?? ''),
      ledger: Number(raw.ledger ?? 0),
      eventIndex: Number(raw.eventIndex ?? 0),
      payload: raw.payload ?? {},
      observedAt: new Date(),
    };
  }

  isValid(event: IngestedEventDto): boolean {
    return Boolean(
      event.contractId &&
        event.topic &&
        event.txHash &&
        Number.isInteger(event.ledger) &&
        event.ledger > 0 &&
        Number.isInteger(event.eventIndex) &&
        event.eventIndex >= 0,
    );
  }
}
