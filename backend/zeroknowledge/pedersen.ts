const { pedersenHashFinal, toHex } = require('zkp-merkle-airdrop-lib');
const args = require('minimist')(process.argv.slice(2, 4));

pedersenHashFinal(BigInt(args.preCommitment), BigInt(args.rewardID)).then(
  (hash: BigInt) => {
    console.log(toHex(hash));
  }
);
