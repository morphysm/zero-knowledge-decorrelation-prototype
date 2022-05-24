// Collect against locally created merkle tree (only the first 4 commitments)
import { readFileSync } from 'fs';
import { getMerkleTreeFromPublicListOfCommitments } from '../utils/TestUtils';
import {
  generateProofCallData,
  pedersenHash,
  toHex,
} from 'zkp-merkle-airdrop-lib';

/** Generate the proof call data. */
// No on-chain interaction yet, everything happens off-chain

async function main() {
  let WASM_PATH = './build/circuit_js/circuit.wasm';
  let ZKEY_PATH = './build/circuit_final.zkey';
  let commitmentsFileName = './public/publicCommitments.txt';

  let nullifierHex =
    '0x006f69eab082bae59c72bb9e5437aa99f05d38fa9f17966b36f4b0b1a437d721'; // TO MODIFTY
  let secretHex =
    '0x003a15a2cf24feb16896bce4749190c159b6f055fa8050e69d59dee0ecb55475'; // TO MODIFTY

  let WASM_BUFF = readFileSync(WASM_PATH);
  let ZKEY_BUFF = readFileSync(ZKEY_PATH);

  let singers = await hre.ethers.getSigners();
  let collector = singers[1];
  let collectorAddress = collector.address;

  let nullifier = BigInt(nullifierHex);
  let secret = BigInt(secretHex);

  let mt = getMerkleTreeFromPublicListOfCommitments(commitmentsFileName, 5);
  let newProof = await generateProofCallData(
    mt,
    nullifier,
    secret,
    collectorAddress,
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
