const hre = require("hardhat");
import {getMerkleRoot, addNewCommitment} from "../utils/TestUtils";


/**
 * when a new commitment comes it, update the public list of commitments and the merkle root stored inside the airdrop contract 
 */

async function main() {

    let inputFileName = "./test/temp/emptyCommitments.txt"
    let treeHeight = 5;
    let newCommitment = "0x1a382574148a46ea603d3471196820e6b57cc911f2d703745a72aab83ff3de5e"
    
    // update the public list of commitments and return the new Merkle Tree
    let mt = addNewCommitment(inputFileName,newCommitment,treeHeight)
    let newRoot = getMerkleRoot(mt)

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