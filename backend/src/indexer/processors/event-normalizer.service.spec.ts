import { EventNormalizerService } from './event-normalizer.service';

describe('EventNormalizerService', () => {
  const service = new EventNormalizerService();

  it('normalizes topic case and defaults payload', () => {
    const normalized = service.normalize('testnet', {
      contractId: 'C123',
      topic: ' Session_Finalized ',
      txHash: 'abc',
      ledger: 123,
      eventIndex: 2,
    });

    expect(normalized.topic).toBe('session_finalized');
    expect(normalized.payload).toEqual({});
    expect(service.isValid(normalized)).toBe(true);
  });
});
