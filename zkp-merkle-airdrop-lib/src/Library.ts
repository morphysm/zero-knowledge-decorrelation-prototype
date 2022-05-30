/**
 * Library which abstracts away much of the details required to interact with the private airdrop contract.
 */
const snarkjs = require('snarkjs');
const circomlibjs = require('circomlibjs');
const wc = require('./witness_calculator.js');

import { MerkleTree } from './MerkleTree';

export async function generateProofCallData(
  merkleTree: MerkleTree,
  key: BigInt,
  secret: BigInt,
  rewardID: BigInt,
  receiverAddr: string,
  circuitWasmBuffer: Buffer,
  zkeyBuffer: Buffer
): Promise<string> {
  const inputs = generateCircuitInputJson(
    merkleTree,
    key,
    secret,
    rewardID,
    BigInt(receiverAddr)
  );

  const witnessCalculator = await wc(circuitWasmBuffer);
  const witnessBuffer = await witnessCalculator.calculateWTNSBin(inputs, 0);

  const { proof, publicSignals } = await snarkjs.plonk.prove(
    zkeyBuffer,
    witnessBuffer
  );

  const proofProcessed = unstringifyBigInts(proof);
  const pubProcessed = unstringifyBigInts(publicSignals);
  const allSolCallData: string = await snarkjs.plonk.exportSolidityCallData(
    proofProcessed,
    pubProcessed
  );
  const solCallDataProof = allSolCallData.split(',')[0];
  return solCallDataProof;
}

export function mimcSponge(l: BigInt, r: BigInt): BigInt {
  return circomlibjs.mimcsponge.multiHash([l, r]);
}

export function pedersenHash(nullifier: BigInt): BigInt {
  return pedersenHashBuff(toBufferLE(nullifier as any, 31));
}

export function pedersenHashPreliminary(
  nullifier: BigInt,
  secret: BigInt
): BigInt {
  const nullifierBuffer = toBufferLE(nullifier as any, 31);
  const secretBuffer = toBufferLE(secret as any, 31);

  const preliminaryBuffer = Buffer.concat([nullifierBuffer, secretBuffer]);
  return pedersenHashBuff(preliminaryBuffer);
}

export function pedersenHashFinal(preCommitment: BigInt, rewardID: BigInt) {
  const nullSecHashBuffer = toBufferLE(preCommitment as any, 32);
  const rewardIDBuffer = toBufferLE(rewardID as any, 31);

  const finalBuffer = Buffer.concat([nullSecHashBuffer, rewardIDBuffer]);
  return pedersenHashBuff(finalBuffer);
}

export function toHex(number: BigInt, length = 32) {
  const str: string = number.toString(16);
  return '0x' + str.padStart(length * 2, '0');
}

// Non-exported
interface CircuitInput {
  root: BigInt;
  nullifierHash: BigInt;
  nullifier: BigInt;
  secret: BigInt;
  pathIndices: number[];
  pathElements: BigInt[];
  recipient: BigInt;
}

function generateCircuitInputJson(
  mt: MerkleTree,
  nullifier: BigInt,
  secret: BigInt,
  rewardID: BigInt,
  recieverAddr: BigInt
): CircuitInput {
  const preCommitment = pedersenHashPreliminary(nullifier, secret);
  const commitment = pedersenHashFinal(preCommitment, rewardID);
  const mp = mt.getMerkleProof(commitment);
  const nullifierHash = pedersenHash(nullifier);

  const inputObj = {
    root: mt.root.val,
    nullifierHash: nullifierHash,
    nullifier: nullifier,
    secret: secret,
    rewardID: rewardID,
    pathIndices: mp.indices,
    pathElements: mp.vals,
    recipient: recieverAddr,
  };
  return inputObj;
}

function pedersenHashBuff(buff: Buffer): BigInt {
  const point = circomlibjs.pedersenHash.hash(buff);
  return circomlibjs.babyjub.unpackPoint(point)[0];
}

// Lifted from ffutils: https://github.com/iden3/ffjavascript/blob/master/src/utils_bigint.js
function unstringifyBigInts(o: any): any {
  if (typeof o == 'string' && /^[0-9]+$/.test(o)) {
    return BigInt(o);
  } else if (typeof o == 'string' && /^0x[0-9a-fA-F]+$/.test(o)) {
    return BigInt(o);
  } else if (Array.isArray(o)) {
    return o.map(unstringifyBigInts);
  } else if (typeof o == 'object') {
    const res: { [key: string]: any } = {};
    const keys = Object.keys(o);
    keys.forEach((k) => {
      res[k] = unstringifyBigInts(o[k]);
    });
    return res;
  } else {
    return o;
  }
}

function toBufferLE(bi: BigInt, width: number): Buffer {
  const hex = bi.toString(16);
  const buffer = Buffer.from(
    hex.padStart(width * 2, '0').slice(0, width * 2),
    'hex'
  );
  buffer.reverse();
  return buffer;
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
