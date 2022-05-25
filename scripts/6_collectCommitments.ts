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
  // reward to be payed out, set by the server/project maintainer
  let reward = BigInt(42);
  let commitment = pedersenHashSequential([nullifier, secret, reward]);
  let hexCommitment = toHex(commitment);
  console.log(commitment);
  console.log(hexCommitment);

  // update the public list of commitments
  addNewCommitment(inputFileName, hexCommitment, treeHeight);
  // generate the merkletree
  let mt = getMerkleTreeFromPublicListOfCommitments(inputFileName, treeHeight);
  let newRoot = getMerkleRoot(mt);
  console.log(
    `new commitment generated ${hexCommitment} from nullifier: ${nullifierHex}, secret: ${secretHex} and reward ${toHex(
      reward
    )}`
  );

  let AIRDROP_ADDR = '0xc3e53F4d16Ae77Db1c982e75a937B9f60FE63690'; // TO MODIFTY
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
