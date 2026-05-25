import { Injectable, Logger } from '@nestjs/common';
import { IngestedEventDto } from '../dto/ingested-event.dto';
import { compareEventsByCursor } from '../processors/event-ordering.util';

@Injectable()
export class IndexerQueueService {
  private readonly logger = new Logger(IndexerQueueService.name);
  private readonly buffer: IngestedEventDto[] = [];

  async enqueue(event: IngestedEventDto) {
    this.buffer.push(event);
    this.buffer.sort(compareEventsByCursor);

    this.logger.debug(`Queued event ${event.topic} at ${event.txHash}#${event.eventIndex}`);
  }

  drain(): IngestedEventDto[] {
    const queued = [...this.buffer];
    this.buffer.length = 0;
    return queued;
  }

  size() {
    return this.buffer.length;
  }
}
