import {addNewCommitment, randomBigInt} from "../utils/TestUtils";
import {toHex, pedersenHashConcat } from "zkp-merkle-airdrop-lib";

/**
 * when a new commitment comes it, update the public list of commitments and the merkle root stored inside the airdrop contract 
 */

async function main() {

    let inputFileName = "./test/temp/publicCommitments.txt" // THIS FILE SHOULD BE STORED IN THE PUBLIC FOLDER ON THE FRONTEND
    let treeHeight = 5;
    let keyHex = toHex(randomBigInt(31)) // SAVE IT AS STATE ON THE FRONTEND
    let secretHex = toHex(randomBigInt(31)) // SAVE IT AS STATE ON THE FRONTEND
    let key = BigInt(keyHex)
    let secret = BigInt (secretHex)
    let commitment = pedersenHashConcat(key, secret)
    let hexCommitment = toHex(commitment)
    // update the public list of commitments
    addNewCommitment(inputFileName,hexCommitment,treeHeight)
    console.log(`new commitment generated ${hexCommitment} from key: ${keyHex} and secret ${secretHex}`)
}

main()
    .then(() => process.exit(0))
    .catch(e => {
        console.error(e);
        process.exit(1);
    })