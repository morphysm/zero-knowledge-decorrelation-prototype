const hre = require("hardhat");
import {getMerkleRoot, addNewCommitment, randomBigInt, getMerkleTreeFromPublicListOfCommitments} from "../utils/TestUtils";
import {toHex, pedersenHashConcat } from "zkp-merkle-airdrop-lib";

/**
 * when a new commitment comes it, update the public list of commitments and the merkle root stored inside the airdrop contract 
 */

async function main() {

    let inputFileName = "./public/publicCommitments.txt"
    let treeHeight = 5;

    let keyHex = toHex(randomBigInt(31)) 
    let nullifierHex = toHex(randomBigInt(31))

    let key = BigInt(keyHex)
    let nullifier = BigInt (nullifierHex)
    let commitment = pedersenHashConcat(key, nullifier)
    let hexCommitment = toHex(commitment)

    // update the public list of commitments
    addNewCommitment(inputFileName,hexCommitment,treeHeight)
    // generate the merkletree
    let mt = getMerkleTreeFromPublicListOfCommitments(inputFileName, treeHeight)
    let newRoot = getMerkleRoot(mt)
    console.log(`new commitment generated ${hexCommitment} from key: ${keyHex} and nullifier ${nullifierHex}`)

    //TO ADD 
    let AIRDROP_ADDR = "";
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