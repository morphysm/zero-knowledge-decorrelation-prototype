import {
  generateProofCallData,
  pedersenHash,
  toHex,
} from 'zkp-merkle-airdrop-lib';
import { getMerkleTreeFromCommitments } from './MerkleTree';
import {
  getPublicCommitments,
  getZKey,
  getWasm,
} from '../services/AirdropService';

export const hashNullifier = async (nullifierHex: string) => {
  return toHex(await pedersenHash(BigInt(nullifierHex)));
};

export const generateProof = async (
  receiverAddress: string,
  nullifierHex: string,
  secretHex: string,
  rewardIDHex: string
): Promise<string> => {
  const commitments = await getPublicCommitments();
  // TODO create loading indicator, see if ArrayBuffer to Buffer can be removed
  const wasm = toBuffer(await getWasm());
  const zkey = toBuffer(await getZKey());

  return calculateProof(
    commitments,
    receiverAddress,
    nullifierHex,
    secretHex,
    rewardIDHex,
    wasm,
    zkey
  );
};

const calculateProof = async (
  commitments: string[],
  receiverAddress: string,
  nullifierHex: string,
  secretHex: string,
  rewardIDHex: string,
  wasm: Buffer,
  zkey: Buffer
): Promise<string> => {
  let nullifier = BigInt(nullifierHex);
  let secret = BigInt(secretHex);
  let rewardID = BigInt(rewardIDHex);

  let mt = await getMerkleTreeFromCommitments(commitments, 5);
  let newProof = await generateProofCallData(
    mt,
    nullifier,
    secret,
    rewardID,
    receiverAddress,
    wasm,
    zkey
  );

  return newProof;
};

function toBuffer(ab: ArrayBuffer) {
  const buf = Buffer.alloc(ab.byteLength);
  const view = new Uint8Array(ab);
  for (let i = 0; i < buf.length; ++i) {
    buf[i] = view[i];
  }
  return buf;
}
