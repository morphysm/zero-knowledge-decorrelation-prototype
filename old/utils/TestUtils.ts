import * as crypto from 'crypto';
import { readFileSync, writeFileSync } from 'fs';
import {
  MerkleTree,
  pedersenHashPreliminary,
  toHex,
} from '../../zkp-merkle-airdrop-lib';
import { exit } from 'process';

/** MerkleTree and inputs used to derive. */
export interface MerkleTreeAndSource {
  merkleTree: MerkleTree;
  leafNullifiers: BigInt[];
  leafSecrets: BigInt[];
}

/**
 * Generates a Merkle Tree from random leaves of size @param numLeaves.
 */
export async function generateMerkleTreeAndKeys(
  numLeaves: number
): Promise<MerkleTreeAndSource> {
  const leafNullifiers: BigInt[] = [];
  const leafSecrets: BigInt[] = [];
  const leaves: BigInt[] = [];
  for (let i = 0; i < numLeaves; i++) {
    leafNullifiers.push(randomBigInt(31));
    leafSecrets.push(randomBigInt(31));
    const leaf = await pedersenHashPreliminary(
      leafNullifiers[i],
      leafSecrets[i]
    );
    leaves.push(leaf);
  }
  const merkleTree = await MerkleTree.createFromLeaves(leaves);
  return { merkleTree, leafNullifiers, leafSecrets };
}

export function saveMerkleTreeAndSource(
  mts: MerkleTreeAndSource,
  filePrefix: string = ''
) {
  if (mts.leafNullifiers.length != mts.leafSecrets.length)
    throw new Error('MTS improperly constructed.');

  let csvContent = 'key,secret,commitment\n';
  for (let i = 0; i < mts.leafNullifiers.length; i++) {
    csvContent +=
      toHex(mts.leafNullifiers[i]) +
      ',' +
      toHex(mts.leafSecrets[i]) +
      ',' +
      toHex(mts.merkleTree.leaves[i].val) +
      '\n';
  }

  writeFileSync(
    `${filePrefix}mt_keys_${mts.leafNullifiers.length}.txt`,
    csvContent
  );
  saveMerkleTree(mts.merkleTree, filePrefix);
}

// THIS IS THE FUNCTION THAT I NEED !

export function saveMerkleTree(mt: MerkleTree, filePrefix: string = '') {
  const storage = mt.getStorageString();
  writeFileSync(`${filePrefix}mt_${mt.leaves.length}.csv`, storage);
}

export async function readMerkleTreeAndSourceFromFile(
  filename: string
): Promise<MerkleTreeAndSource> {
  const leafNullifiers: BigInt[] = [];
  const leafSecrets: BigInt[] = [];
  const leaves: BigInt[] = [];
  const contents = readFileSync(filename, 'utf8');
  const lines = contents.split('\n');
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    const tokens = line.split(',');
    if (tokens.length < 3) continue;

    const key = tokens[0];
    const secret = tokens[1];
    const commitment = tokens[2].split('\n')[0];
    leafNullifiers.push(BigInt(key));
    leafSecrets.push(BigInt(secret));
    leaves.push(BigInt(commitment));
  }
  const merkleTree = await MerkleTree.createFromLeaves(leaves);
  return { merkleTree, leafNullifiers, leafSecrets };
}

export function randomBigInt(nBytes: number): BigInt {
  return toBigIntLE(crypto.randomBytes(nBytes));
}

export function toBigIntLE(buff: Buffer) {
  const reversed = Buffer.from(buff);
  reversed.reverse();
  const hex = reversed.toString('hex');
  if (hex.length === 0) {
    return BigInt(0);
  }
  return BigInt(`0x${hex}`);
}

export function getMerkleRoot(mt: MerkleTree): string {
  const root = mt.root.val;

  return toHex(root);
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

// '<svg width="500" height="500" xmlns="http://www.w3.org/2000/svg">',
// '<rect id="svg_11" height="600" width="503" y="0" x="0" fill="hsl(',
// currentWord.bgHue,
// ',50%,25%)"/>',
// '<text font-size="18" y="10%" x="5%" fill="hsl(',
// random,
// ',100%,80%)">Some Text</text>',
// '<text font-size="18" y="15%" x="5%" fill="hsl(',
// random,
// ',100%,80%)">Some Text</text>',
// '<text font-size="18" y="20%" x="5%" fill="hsl(',
// random,
// ',100%,80%)">Some Text</text>',
// '<text font-size="18" y="10%" x="80%" fill="hsl(',
// random,
// ',100%,80%)">Token: ',
// _tokenId.toString(),
// "</text>",
// '<text font-size="18" y="50%" x="50%" text-anchor="middle" fill="hsl(',
// random,
// ',100%,80%)">',
// currentWord.value,
// "</text>",
// "</svg>"
