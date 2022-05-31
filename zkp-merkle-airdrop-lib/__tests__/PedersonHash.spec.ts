import { pedersenHash } from '../src/Library';

describe('Pederson Hash', () => {
  test('should be calculated correctly', async () => {
    const nullifier = BigInt(
      '0x00a88cb7c2ab7f014b7b9cca92d42b7fe9416d4a1d9872267aefc2e8a6388c66'
    );
    const hash = await pedersenHash(nullifier);
    expect(hash).toEqual(
      BigInt(
        '0x143A417682A8B4E741C4CCA74178FD6BB4BFA33CDFCD99A392BC18C9998FE344'
      )
    );
  });
});
