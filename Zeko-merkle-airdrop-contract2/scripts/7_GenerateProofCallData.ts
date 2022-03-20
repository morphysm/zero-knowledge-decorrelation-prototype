// Collect against locally created merkle tree (only the first 4 commitments)
import { readFileSync } from "fs";
import { getMerkleTreeFromPublicListOfCommitments } from "../utils/TestUtils";
import { generateProofCallData, pedersenHash, toHex } from "zkp-merkle-airdrop-lib";

/** Generate the proof call data. */
// No on-chain interaction yet, everything happens off-chain

async function main() {

    let WASM_PATH = "./build/circuit_js/circuit.wasm";
    let ZKEY_PATH = "./build/circuit_final.zkey"; 
    let commitmentsFileName = "./public/publicCommitments.txt" 
    // TO ADD

    let keyHex  = "0x00fd6324a494985473e134a47f9aea31e8953aa2d941c7f4889b78fb931a32f7"
    let secretHex = "0x006d1ac14bb5723988deccc6c00df85246d3ec3ff8e852a3b3505ae330eb679a"

    let WASM_BUFF = readFileSync(WASM_PATH);
    let ZKEY_BUFF = readFileSync(ZKEY_PATH);
    
    let singers = await hre.ethers.getSigners();
    let collector = singers[1]
    let collectorAddress = collector.address

    let key = BigInt(keyHex)
    let secret = BigInt (secretHex)

    let mt = getMerkleTreeFromPublicListOfCommitments(commitmentsFileName, 5)
    let newProof =
        await generateProofCallData(
            mt,
            key,   
            secret,
            collectorAddress,
            WASM_BUFF,
            ZKEY_BUFF);

    let newKeyHash = toHex(pedersenHash(key)); // hash of the nullifier => need to be passed to avoid double spending

    console.log("Proof: ", newProof) ; 
    console.log("keyHash", newKeyHash)
}

main()
    .then(() => process.exit(0))
    .catch(e => {
        console.error(e);
        process.exit(1);
    })