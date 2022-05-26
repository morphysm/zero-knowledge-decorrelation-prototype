// Collect against locally created merkle tree (only the first 4 commitments)
const hre = require('hardhat');
import { readFileSync } from 'fs';
import { getMerkleTreeFromPublicListOfCommitments } from '../utils/TestUtils';
import {
  generateProofCallData,
  pedersenHash,
  toHex,
} from 'zkp-merkle-airdrop-lib';

/** Collect an airdrop from the local merkle tree against deployed contract. */
async function main() {
  let AIRDROP_ADDR = '0x34B40BA116d5Dec75548a9e9A8f15411461E8c70'; // TO MODIFTY

  let singers = await hre.ethers.getSigners();
  let collector = singers[1];

  // TO MODIFTY
  let proof =
    '0x18bbeeb1efe09c95fd82303612bab6548b4c2bddc0257737c0a0bd2455126b1124be6545b12a128bc2d3c45dea7aba03d7de5792f1ecab23c7575fb98e5d876123917e03549482927f092e8966b87d18c25b33241342785a9524e51edcda5a8d2dd64e6f4a34379757e5ed7726b5bff5a5718c052912133b252580e3774c29ad0b2c59143a6fa42420c7305eb306d5e8513ee4566e63e4bcf6703d531e07490f1d572a459b2930866b0bbe96e07b14bddefc6fbda27185a252a9c71069976fd72bfc1e8f77eba1393bbae749d88c885495855e41d20b397febce1386d40a7bb4032ac8cd2f29e50ef6ace80c976c53bfe19c2633090795eac55fb56313d640d110847fb942d8a362484abbe2aa5923fede50438ff8bdc2cfebc99551b1713e7324d257f3a6ff7daa3b74504b20f3bbcf66f5193ccf640afda272fc6ce1924caf2560ba567418a13c842e0eef0350a0e10f41415cc00008da87c11a8b38c04a612f509acd786be9ecb0ec4d0076cdfef18f1da4608d1573e83871853f3117c1741d4fffe1d6c158deaf8d66527170d60a9018333322d1c37c262fb20ee65603570f5e99e74a4e6df24c58e0d9d2cdf289852dfbb2d1f7d00ff8b80d79f62f2fc017418db9f8b534e7ba35ac2f4debdaf5c1687a6317562ff5d3520b6db6dc7ab4047b6c91526f61527f060922e6cce6edddbbf83451548d3b7dc5e058c43a458214b78ae2cee861710aace3d00e82de5dd84e3d684fd38c9df5ecd0ff25ea85082d31320d3fe556733d6ac4ef60c7da500c13894f8cea031ac66d775b785526c0012148903ecb3c337ceb66468d0a8da97ea4f7386b43111e9e2e330bd36caa7f22cd4dd15b48eec14cc04c25ed0d2ef16cda1755e460a3fe693b0204d715493220d834277b9c5dea078e08232755df583cd5f89e81507fa0fdf765a88f5f2c350d345d0bb27e11f115c9cb2d18f90b78dfc393887147abaa374e23fa08f1645e2f880e7e02a40e1463a5049c2b5e00d98ca295ef665f7bbb744ef024486acab315527e3ff9baf216533448a18b4abcfcfd5d02114801319d71b3dcf8aa4719301ebc935ef5c95c44e440b735b443bf1a4e78727b5c3b31b0eb195e4933caad12';
  let nullifierHash =
    '0x2728830b5c42721d89e2d37b47101d818baf05863c22e772ee1d387110f805ab';
  let reward =
    '0x000000000000000000000000000000000000000000000000000000000000002a';

  let airdropContract = await hre.ethers.getContractAt(
    'PrivateAirdrop',
    AIRDROP_ADDR
  );
  let tx = await airdropContract
    .connect(collector)
    .collectAirdrop(proof, nullifierHash, reward);
  await tx.wait();
  console.log(
    `Proof verified => NFT succesfully collected by ${collector.address}!`
  );
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(-1);
  });
