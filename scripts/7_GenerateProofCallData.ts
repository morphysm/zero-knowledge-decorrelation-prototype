// Collect against locally created merkle tree (only the first 4 commitments)
import { readFileSync } from 'fs';
import { getMerkleTreeFromPublicListOfCommitments } from '../utils/TestUtils';
import { pedersenHash, toHex } from 'zkp-merkle-airdrop-lib';
import { generateProofCallData } from '../lib/Library';

/** Generate the proof call data. */
// No on-chain interaction yet, everything happens off-chain

async function main() {
  let WASM_PATH = './build/circuit_js/circuit.wasm';
  let ZKEY_PATH = './build/circuit_final.zkey';
  let commitmentsFileName = './public/publicCommitments.txt';

  let nullifierHex =
    '0x00a787886e77aa2c6db3cc8918bab7ada3430c977a2448a54ffcb51d0c5c8438'; // TO MODIFTY
  let secretHex =
    '0x00c8bf15a2df268086a0e2a15ea188320f9a26a1db6e33639421b4431dd30f68'; // TO MODIFTY
  let rewardHex =
    '0x000000000000000000000000000000000000000000000000000000000000002a'; // TO MODIFTY

  let WASM_BUFF = readFileSync(WASM_PATH);
  let ZKEY_BUFF = readFileSync(ZKEY_PATH);

  let singers = await hre.ethers.getSigners();
  let collector = singers[1];
  let collectorAddress = collector.address;

  let nullifier = BigInt(nullifierHex);
  let secret = BigInt(secretHex);
  let reward = BigInt(rewardHex);
  console.log(reward);

  let mt = getMerkleTreeFromPublicListOfCommitments(commitmentsFileName, 5);
  let newProof = await generateProofCallData(
    mt,
    nullifier,
    secret,
    collectorAddress,
    reward,
    WASM_BUFF,
    ZKEY_BUFF
  );

  let newNullifierHash = toHex(pedersenHash(nullifier)); // hash of the nullifier => need to be passed to avoid double spending

  console.log('Proof: ', newProof);
  console.log('nullifier Hash', newNullifierHash);
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
