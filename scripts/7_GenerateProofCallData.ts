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
    '0x00202a03cea47b7918a36f12e6522c88f8fbcc9f74e07d529e9ce8f3a113ea87'; // TO MODIFTY
  let secretHex =
    '0x00c46daf8a91c6b69e260765036de0ccf4b2e1cfe063ca630a6611f13adadee0'; // TO MODIFTY
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

  let nullifierHash = toHex(pedersenHash(nullifier)); // hash of the nullifier => need to be passed to avoid double spending

  console.log('Proof: ', newProof);
  console.log('Nullifier Hash: ', nullifierHash);
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
