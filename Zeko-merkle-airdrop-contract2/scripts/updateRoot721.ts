const hre = require("hardhat");
import {getMerkleRoot, addNewCommitment, randomBigInt} from "../utils/TestUtils";
import {toHex, pedersenHashConcat } from "zkp-merkle-airdrop-lib";

/**
 * when a new commitment comes it, update the public list of commitments and the merkle root stored inside the airdrop contract 
 */

async function main() {

    let inputFileName = "./test/temp/publicCommitments.txt" // ADD IT IN THE PUBLIC FOLDER ON THE FRONTEND
    let treeHeight = 5;
    let keyHex = toHex(randomBigInt(31)) // SAVE IT AS STATE
    let secretHex = toHex(randomBigInt(31)) // SAVE IT AS STATE

    let key = BigInt(keyHex)
    let secret = BigInt (secretHex)
    let commitment = pedersenHashConcat(key, secret)
    let hexCommitment = toHex(commitment)
    // update the public list of commitments and return the new Merkle Tree
    let mt = addNewCommitment(inputFileName,hexCommitment,treeHeight)
    let newRoot = getMerkleRoot(mt)
    console.log(`new commitment generated ${hexCommitment} from key: ${keyHex} and secret ${secretHex}`)

    let AIRDROP_ADDR = "0x5948fb7e3510a194f955C80f1361837bf37B3fb8";
    let airdropContract = await hre.ethers.getContractAt("PrivateAirdrop", AIRDROP_ADDR)
    await airdropContract.updateRoot(newRoot);

    console.log(`merkleRoot storage variable succesfully updated to ${newRoot} `)
}

main()
    .then(() => process.exit(0))
    .catch(e => {
        console.error(e);
        process.exit(1);
    })