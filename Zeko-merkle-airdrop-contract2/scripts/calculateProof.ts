// Collect against locally created merkle tree (only the first 4 commitments)
import { readFileSync } from "fs";
import { getMerkleTreeFromPublicListOfCommitments } from "../utils/TestUtils";
import { generateProofCallData, pedersenHash, toHex } from "zkp-merkle-airdrop-lib";
import { providers} from 'ethers';


/** Collect an airdrop from the local merkle tree against deployed contract. */
async function main() {

    let WASM_PATH = "./build/circuit_js/circuit.wasm"; // THIS FILE SHOULD BE STORED IN THE PUBLIC FOLDER ON THE FRONTEND
    let ZKEY_PATH = "./build/circuit_final.zkey"; // THIS FILE SHOULD BE STORED IN THE PUBLIC FOLDER ON THE FRONTEND

    let WASM_BUFF = readFileSync(WASM_PATH);
    let ZKEY_BUFF = readFileSync(ZKEY_PATH);
    
    let commitmentsFileName = "./test/temp/publicCommitments.txt" // RETRIEVE IT FROM THE PUBLIC FOLDER STORED ON THE FRONTEND

    // IN ORDER TO CONNECT THE WALLET ON THE FRONTEND
    // GET SIGNER
    let provider = new providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    let signer = provider.getSigner();
    let address = await signer.getAddress();

    let keyHex  // RETRIEVE IT FROM THE STATE
    let secretHex // RETRIEVE IT FROM THE STATE

    let key = BigInt(keyHex)
    let secret = BigInt (secretHex)

    let mt = getMerkleTreeFromPublicListOfCommitments(commitmentsFileName, 5)
    let proof =
        await generateProofCallData(
            mt,
            key,   
            secret,
            address,
            WASM_BUFF,
            ZKEY_BUFF);
    console.log("Proof: ", proof); // SAVE IT IN THE STATE 

    let keyHash = toHex(pedersenHash(key)); // SAVE IT IN THE STATE

}

main().then(() => process.exit(0))
    .catch(e => {
        console.error(e);
        process.exit(-1);
    })