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

    let nullifierHex  = "0x00879db2286f14b6be039318cdc8d5457e65dd4181b01c24bca734717852bb73" // TO MODIFTY
    let secretHex = "0x000d6248c042085574badf94be3571ca4d75eb9ad6ffaa1f6105477beb7730e5" // TO MODIFTY
 
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
    console.log("nullifier Hash", newNullifierHash)
}

main()
    .then(() => process.exit(0))
    .catch(e => {
        console.error(e);
        process.exit(1);
    })