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
    let nullifierHex  = ""
    let secretHex = ""

    let WASM_BUFF = readFileSync(WASM_PATH);
    let ZKEY_BUFF = readFileSync(ZKEY_PATH);
    
    let singers = await hre.ethers.getSigners();
    let collector = singers[1]
    let collectorAddress = collector.address

    let nullifier = BigInt(nullifierHex)
    let secret = BigInt (secretHex)

    let mt = getMerkleTreeFromPublicListOfCommitments(commitmentsFileName, 5)
    let newProof =
        await generateProofCallData(
            mt,
            nullifier,   
            secret,
            collectorAddress,
            WASM_BUFF,
            ZKEY_BUFF);

    let newNullifierHash = toHex(pedersenHash(nullifier)); // hash of the nullifier => need to be passed to avoid double spending

    console.log("Proof: ", newProof) ; 
    console.log("nullifierHash", newNullifierHash)
}

main()
    .then(() => process.exit(0))
    .catch(e => {
        console.error(e);
        process.exit(1);
    })