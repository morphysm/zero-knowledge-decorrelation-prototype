const hre = require('hardhat');
import {
  getMerkleRoot,
  addNewCommitment,
  randomBigInt,
  getMerkleTreeFromPublicListOfCommitments,
} from '../utils/TestUtils';
import { toHex } from 'zkp-merkle-airdrop-lib';
import { pedersenHashSequential } from '../lib/Library';

/**
 * when a new commitment comes it, update the public list of commitments and the merkle root stored inside the airdrop contract
 */

async function main() {
  let inputFileName = './public/publicCommitments.txt';
  let treeHeight = 5;

  let nullifierHex = toHex(randomBigInt(31));
  let secretHex = toHex(randomBigInt(31));

  let nullifier = BigInt(nullifierHex);
  let secret = BigInt(secretHex);
  // rewardID to be payed out, set by the server/project maintainer
  let rewardID = BigInt(42);
  let commitment = pedersenHashSequential(nullifier, secret, rewardID);
  let hexCommitment = toHex(commitment);

  // update the public list of commitments
  addNewCommitment(inputFileName, hexCommitment, treeHeight);
  // generate the merkletree
  let mt = getMerkleTreeFromPublicListOfCommitments(inputFileName, treeHeight);
  let newRoot = getMerkleRoot(mt);
  console.log(
    `new commitment generated ${hexCommitment} from nullifier: ${nullifierHex}, secret: ${secretHex} and rewardID ${toHex(
      rewardID
    )}`
  );

  let AIRDROP_ADDR = '0x34B40BA116d5Dec75548a9e9A8f15411461E8c70'; // TO MODIFTY
  let airdropContract = await hre.ethers.getContractAt(
    'PrivateAirdrop',
    AIRDROP_ADDR
  );
  await airdropContract.updateRoot(newRoot);

  console.log(`merkleRoot storage variable succesfully updated to ${newRoot} `);
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
