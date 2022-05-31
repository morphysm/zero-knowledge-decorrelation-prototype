"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toHex = exports.pedersenHashFinal = exports.pedersenHashPreliminary = exports.pedersenHash = exports.mimcSponge = exports.generateProofCallData = void 0;
/**
 * Library which abstracts away much of the details required to interact with the private airdrop contract.
 */
const snarkjs = require('snarkjs');
const circomlibjs = require('circomlibjs');
// TODO remove workaround for unpacking issue
// When upacking the point with the new library, the return type is a Uint8Array.
// It is currently unclear to me how to transform this correctly to BigInt.
// Maybe the return value encoded in the Uint8Array also got changed,
// however i doubt that since then the circuit library would also have changed.
const circomlibjsOld = require('circomlibjs-old');
const wc = require('./witness_calculator.js');
let mimcSpongeInstance;
const getMimcSponge = async () => {
    if (mimcSpongeInstance === undefined) {
        mimcSpongeInstance = await circomlibjs.buildMimcSponge();
    }
    return mimcSpongeInstance;
};
let pedersenInstance;
const getPedersen = async () => {
    if (pedersenInstance === undefined) {
        pedersenInstance = await circomlibjs.buildPedersenHash();
    }
    return pedersenInstance;
};
let babyjubInstance;
const getBabyjub = async () => {
    if (babyjubInstance === undefined) {
        babyjubInstance = await circomlibjs.buildBabyjub();
    }
    return babyjubInstance;
};
async function generateProofCallData(merkleTree, key, secret, rewardID, receiverAddr, circuitWasmBuffer, zkeyBuffer) {
    const inputs = await generateCircuitInputJson(merkleTree, key, secret, rewardID, BigInt(receiverAddr));
    console.log(inputs);
    const witnessCalculator = await wc(circuitWasmBuffer);
    const witnessBuffer = await witnessCalculator.calculateWTNSBin(inputs, 0);
    const { proof, publicSignals } = await snarkjs.plonk.prove(zkeyBuffer, witnessBuffer);
    const proofProcessed = unstringifyBigInts(proof);
    const pubProcessed = unstringifyBigInts(publicSignals);
    const allSolCallData = await snarkjs.plonk.exportSolidityCallData(proofProcessed, pubProcessed);
    const solCallDataProof = allSolCallData.split(',')[0];
    return solCallDataProof;
}
exports.generateProofCallData = generateProofCallData;
async function mimcSponge(l, r) {
    const mimcSponge = await getMimcSponge();
    return toBigIntLE(mimcSponge.multiHash([l, r]));
}
exports.mimcSponge = mimcSponge;
async function pedersenHash(nullifier) {
    return await pedersenHashBuff(toBufferLE(nullifier, 31));
}
exports.pedersenHash = pedersenHash;
async function pedersenHashPreliminary(nullifier, secret) {
    const nullifierBuffer = toBufferLE(nullifier, 31);
    const secretBuffer = toBufferLE(secret, 31);
    const preliminaryBuffer = Buffer.concat([nullifierBuffer, secretBuffer]);
    return await pedersenHashBuff(preliminaryBuffer);
}
exports.pedersenHashPreliminary = pedersenHashPreliminary;
async function pedersenHashFinal(preCommitment, rewardID) {
    const nullSecHashBuffer = toBufferLE(preCommitment, 32);
    const rewardIDBuffer = toBufferLE(rewardID, 31);
    const finalBuffer = Buffer.concat([nullSecHashBuffer, rewardIDBuffer]);
    return await pedersenHashBuff(finalBuffer);
}
exports.pedersenHashFinal = pedersenHashFinal;
function toHex(number, length = 32) {
    const str = number.toString(16);
    return '0x' + str.padStart(length * 2, '0');
}
exports.toHex = toHex;
async function generateCircuitInputJson(mt, nullifier, secret, rewardID, recieverAddr) {
    const preCommitment = await pedersenHashPreliminary(nullifier, secret);
    const commitment = await pedersenHashFinal(preCommitment, rewardID);
    const mp = await mt.getMerkleProof(commitment);
    const nullifierHash = await pedersenHash(nullifier);
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
async function pedersenHashBuff(buff) {
    const pedersen = await getPedersen();
    const point = pedersen.hash(buff);
    // TODO as described above
    const hash = circomlibjsOld.babyjub.unpackPoint(point)[0];
    return hash;
}
// Lifted from ffutils: https://github.com/iden3/ffjavascript/blob/master/src/utils_bigint.js
function unstringifyBigInts(o) {
    if (typeof o == 'string' && /^[0-9]+$/.test(o)) {
        return BigInt(o);
    }
    else if (typeof o == 'string' && /^0x[0-9a-fA-F]+$/.test(o)) {
        return BigInt(o);
    }
    else if (Array.isArray(o)) {
        return o.map(unstringifyBigInts);
    }
    else if (typeof o == 'object') {
        const res = {};
        const keys = Object.keys(o);
        keys.forEach((k) => {
            res[k] = unstringifyBigInts(o[k]);
        });
        return res;
    }
    else {
        return o;
    }
}
function toBufferLE(bi, width) {
    const hex = bi.toString(16);
    const buffer = Buffer.from(hex.padStart(width * 2, '0').slice(0, width * 2), 'hex');
    buffer.reverse();
    return buffer;
}
function toBigIntLE(buff) {
    const reversed = Buffer.from(buff);
    reversed.reverse();
    const hex = reversed.toString('hex');
    if (hex.length === 0) {
        return BigInt(0);
    }
    return BigInt(`0x${hex}`);
}
