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
    '0x00c09769b712aee13a08dfc20cb3eaa32235198c49335e80523e3499a52cb256'; // TO MODIFTY
  let secretHex =
    '0x0000aed32ac784039cdf4f18ee349880f253967615bd87f84fb08fab0dbe333f'; // TO MODIFTY
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
