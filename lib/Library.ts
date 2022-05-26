const snarkjs = require('snarkjs');
const circomlibjs = require('circomlibjs');
import { MerkleTree, pedersenHash, toHex } from 'zkp-merkle-airdrop-lib';
const wc = require('./witness_calculator.js');

export async function generateProofCallData(
  merkleTree: MerkleTree,
  key: BigInt,
  secret: BigInt,
  receiverAddr: string,
  reward: BigInt,
  circuitWasmBuffer: Buffer,
  zkeyBuffer: Buffer
): Promise<string> {
  let inputs = generateCircuitInputJson(
    merkleTree,
    key,
    secret,
    reward,
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

export function pedersenHashSequential(
  nullifier: BigInt,
  secret: BigInt,
  reward: BigInt
): BigInt {
  const nullifierBuffer = toBufferLE(nullifier as any, 31);
  const secretBuffer = toBufferLE(secret as any, 31);
  const rewardBuffer = toBufferLE(reward as any, 31);

  const nullSecBuffer = Buffer.concat([nullifierBuffer, secretBuffer]);
  const nullSecHash = pedersenHashBuff(nullSecBuffer);

  const nullSecHashBuffer = toBufferLE(nullSecHash as any, 32);

  const commitmentBuffer = Buffer.concat([nullSecHashBuffer, rewardBuffer]);
  return pedersenHashBuff(commitmentBuffer);
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
  reward: BigInt;
  pathIndices: number[];
  pathElements: BigInt[];
  recipient: BigInt;
}

function generateCircuitInputJson(
  mt: MerkleTree,
  nullifier: BigInt,
  secret: BigInt,
  reward: BigInt,
  recieverAddr: BigInt
): CircuitInput {
  let commitment = pedersenHashSequential(nullifier, secret, reward);
  let mp = mt.getMerkleProof(commitment);
  let nullifierHash = pedersenHash(nullifier);

  let inputObj = {
    root: mt.root.val,
    nullifierHash: nullifierHash,
    nullifier: nullifier,
    secret: secret,
    reward: reward,
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

function toBinaryString(buf: Buffer): string {
  let result = [];
  for (let b of buf) {
    result.push(b.toString(2).padStart(8, '0'));
  }
  return result.join('');
}
