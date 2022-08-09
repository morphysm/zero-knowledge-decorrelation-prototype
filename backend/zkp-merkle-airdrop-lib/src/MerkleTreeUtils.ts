import * as crypto from 'crypto';
import { readFileSync, writeFileSync } from 'fs';
import { MerkleTree } from './MerkleTree';
import { exit } from 'process';

function randomBigInt(nBytes: number): BigInt {
  return toBigIntLE(crypto.randomBytes(nBytes));
}

function toBigIntLE(buff: Buffer) {
  const reversed = Buffer.from(buff);
  reversed.reverse();
  const hex = reversed.toString('hex');
  if (hex.length === 0) {
    return BigInt(0);
  }
  return BigInt(`0x${hex}`);
}

export async function addNewCommitment(
  filename: string,
  newcommitment: string,
  treeheight: number
): Promise<MerkleTree> {
  const input: string = readFileSync(filename).toString();
  // replace and empty leaf with the newCommitment leaf
  const commitments = input.trim().split(',');

  const indexToReplace = commitments.indexOf(
    '0x0000000000000000000000000000000000000000000000000000000000000000'
  );
  commitments[indexToReplace] = newcommitment;

  if (commitments.length > 2 ** treeheight) {
    console.error(
      `Too many commitments for tree height. Maximum is ${2 ** treeheight}`
    );
    exit(-1);
  } else if (commitments.length != 2 ** treeheight) {
    console.log(
      `Number of commitments provided (${
        commitments.length
      }) is not equal to total tree width (${
        2 ** treeheight
      }), will fill in remainder with random commitments.`
    );
  }

  const commitmentsBigInt: BigInt[] = commitments.map((commitment) =>
    BigInt(commitment)
  );
  for (let i = commitments.length; i < 2 ** treeheight; i++) {
    commitmentsBigInt.push(randomBigInt(31));
  }

  // UPDATE THE Commitment Public FILE

  const newCommitments = commitments.toString();

  writeFileSync(filename, newCommitments);
  console.log('list of public commitments succesfully updated');

  // Generate the merkle tree and return it
  return await MerkleTree.createFromLeaves(commitmentsBigInt);
}

export async function getMerkleTreeFromPublicListOfCommitments(
  filename: string,
  treeheight: number
): Promise<MerkleTree> {
  const input: string = readFileSync(filename).toString();
  // replace and empty leaf with the newCommitment leaf
  const commitments = input.trim().split(',');

  if (commitments.length > 2 ** treeheight) {
    console.error(
      `Too many commitments for tree height. Maximum is ${2 ** treeheight}`
    );
    exit(-1);
  } else if (commitments.length != 2 ** treeheight) {
    console.log(
      `Number of commitments provided (${
        commitments.length
      }) is not equal to total tree width (${
        2 ** treeheight
      }), will fill in remainder with random commitments.`
    );
  }

  const commitmentsBigInt: BigInt[] = commitments.map((commitment) =>
    BigInt(commitment)
  );
  for (let i = commitments.length; i < 2 ** treeheight; i++) {
    commitmentsBigInt.push(randomBigInt(31));
  }

  // Generate the merkle tree and return it
  return await MerkleTree.createFromLeaves(commitmentsBigInt);
}

export async function getMerkleTreeFromCommitments(
  commitments: string[],
  treeheight: number
): Promise<MerkleTree> {
  if (commitments.length > 2 ** treeheight) {
    console.error(
      `Too many commitments for tree height. Maximum is ${2 ** treeheight}`
    );
    Promise.reject();
  } else if (commitments.length != 2 ** treeheight) {
    console.log(
      `Number of commitments provided (${
        commitments.length
      }) is not equal to total tree width (${
        2 ** treeheight
      }), will fill in remainder with random commitments.`
    );
  }

  const commitmentsBigInt: BigInt[] = commitments.map((commitment) =>
    BigInt(commitment)
  );
  for (let i = commitments.length; i < 2 ** treeheight; i++) {
    commitmentsBigInt.push(randomBigInt(31));
  }

  // Generate the merkle tree and return it
  return await MerkleTree.createFromLeaves(commitmentsBigInt);
}
