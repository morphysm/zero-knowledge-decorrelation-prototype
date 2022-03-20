import {addNewCommitment, randomBigInt} from "../utils/TestUtils";
import {toHex, pedersenHashConcat } from "zkp-merkle-airdrop-lib";

/**
 * when a new commitment comes it, update the public list of commitments and the merkle root stored inside the airdrop contract 
 */


// WHERE SHOULD THE INPUT COME FROM?

 // let inputFileName = "./test/temp/publicCommitments.txt" RETRIEVE IT FROM THE PUBLIC FOLDER STORED ON THE FRONTEND

async function main(inputFileName:string) : Promise<{key: string, secret: string}>  {

    let treeHeight = 5;
    let keyHex = toHex(randomBigInt(31)) 
    let secretHex = toHex(randomBigInt(31))
    let key = BigInt(keyHex)
    let secret = BigInt (secretHex)
    let commitment = pedersenHashConcat(key, secret)
    let hexCommitment = toHex(commitment)
    // update the public list of commitments
    addNewCommitment(inputFileName,hexCommitment,treeHeight)
    console.log(`new commitment generated ${hexCommitment} from key: ${keyHex} and secret ${secretHex}`)
    return {key: keyHex, secret: secretHex} // SET THESE AS STATE, WE'LL NEED THAT LATER
}