const snarkjs = require('snarkjs');
const circomlibjs = require('circomlibjs');
import { MerkleTree, pedersenHash } from 'zkp-merkle-airdrop-lib';
const wc = require('./witness_calculator.js');

export async function generateProofCallData(
  merkleTree: MerkleTree,
  key: BigInt,
  secret: BigInt,
  rewardID: BigInt,
  receiverAddr: string,
  circuitWasmBuffer: Buffer,
  zkeyBuffer: Buffer
): Promise<string> {
  let inputs = generateCircuitInputJson(
    merkleTree,
    key,
    secret,
    rewardID,
    BigInt(receiverAddr)
  );

  let witnessCalculator = await wc(circuitWasmBuffer);
  let witnessBuffer = await witnessCalculator.calculateWTNSBin(inputs, 0);

  let { proof, publicSignals } = await snarkjs.plonk.prove(
    zkeyBuffer,
    witnessBuffer
  );

  let proofProcessed = unstringifyBigInts(proof);
  let pubProcessed = unstringifyBigInts(publicSignals);
  let allSolCallData: string = await snarkjs.plonk.exportSolidityCallData(
    proofProcessed,
    pubProcessed
  );
  let solCallDataProof = allSolCallData.split(',')[0];
  return solCallDataProof;
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

export function pedersenHashConcat(values: BigInt[]): BigInt {
  const buffers = values.map((value) => toBufferLE(value as any, 31));
  const combinedBuffer = Buffer.concat(buffers);
  return pedersenHashBuff(combinedBuffer);
}

function pedersenHashBuff(buff: Buffer): BigInt {
  const point = circomlibjs.pedersenHash.hash(buff);
  return circomlibjs.babyjub.unpackPoint(point)[0];
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

interface CircuitInput {
  root: BigInt;
  nullifierHash: BigInt;
  nullifier: BigInt;
  secret: BigInt;
  rewardID: BigInt;
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
  let mp = mt.getMerkleProof(commitment);
  let nullifierHash = pedersenHash(nullifier);

  let inputObj = {
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
