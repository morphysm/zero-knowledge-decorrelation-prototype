// Collect against locally created merkle tree (only the first 4 commitments)
import { readFileSync } from "fs";
import { getMerkleTreeFromPublicListOfCommitments } from "../utils/TestUtils";
import { generateProofCallData, pedersenHash, toHex } from "zkp-merkle-airdrop-lib";
import { providers} from 'ethers';


/** Collect an airdrop from the local merkle tree against deployed contract. */

//      let WASM_PATH = "./build/circuit_js/circuit.wasm"; // THIS FILE SHOULD BE STORED IN THE PUBLIC FOLDER ON THE FRONTEND
//      let ZKEY_PATH = "./build/circuit_final.zkey"; // THIS FILE SHOULD BE STORED IN THE PUBLIC FOLDER ON THE FRONTEND
// let commitmentsFileName = "./test/temp/publicCommitments.txt" // RETRIEVE IT FROM THE PUBLIC FOLDER STORED ON THE FRONTEND

async function main(WASM_PATH : string, ZKEY_PATH: string, commitmentsFileName: string) : Promise<string> {

    let WASM_BUFF = readFileSync(WASM_PATH);
    let ZKEY_BUFF = readFileSync(ZKEY_PATH);
    
    
    // IN ORDER TO CONNECT THE WALLET ON THE FRONTEND
    // GET SIGNER
    let provider = new providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    let signer = provider.getSigner();
    let address = await signer.getAddress();

    let keyHex  // RETRIEVE IT FROM THE STATE SET PREVIOUSLY
    let secretHex // RETRIEVE IT FROM THE STATE SET PREVIOUSLY

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
    console.log("Proof: ", proof); 
    let keyHash = toHex(pedersenHash(key));
    return proof // SAVE IT IN THE STATE
}