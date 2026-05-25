import { compareEventsByCursor } from './event-ordering.util';
import { IngestedEventDto } from '../dto/ingested-event.dto';

describe('compareEventsByCursor', () => {
  it('sorts by ledger then txHash then eventIndex', () => {
    const a: IngestedEventDto = {
      network: 'testnet',
      contractId: 'c',
      topic: 'a',
      txHash: 'b',
      ledger: 11,
      eventIndex: 1,
      payload: {},
      observedAt: new Date(),
    };

    const b: IngestedEventDto = {
      ...a,
      txHash: 'a',
      eventIndex: 2,
    };

    expect(compareEventsByCursor(b, a)).toBeLessThan(0);
  });
});
