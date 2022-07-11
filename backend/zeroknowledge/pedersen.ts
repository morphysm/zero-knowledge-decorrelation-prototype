import minimist from 'minimist-lite';
import { pedersenHashFinal, toHex } from 'zkp-merkle-airdrop-lib';

const args = minimist(process.argv.slice(2, 4));

pedersenHashFinal(BigInt(args.preCommitment), BigInt(args.rewardID)).then(
  (hash: BigInt) => {
    console.log(toHex(hash));
  }
);
