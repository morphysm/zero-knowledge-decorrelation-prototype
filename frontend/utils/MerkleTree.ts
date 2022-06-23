import * as crypto from 'crypto';
import { MerkleTree } from 'zkp-merkle-airdrop-lib';

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
