// Collect against locally created merkle tree (only the first 4 commitments)
const hre = require("hardhat");
import { readFileSync } from "fs";
import { getMerkleTreeFromPublicListOfCommitments } from "../utils/TestUtils";
import { generateProofCallData, pedersenHash, toHex } from "zkp-merkle-airdrop-lib";

/** Collect an airdrop from the local merkle tree against deployed contract. */
async function main() {
    
    // TO ADD
    let AIRDROP_ADDR = "";
    
    let singers = await hre.ethers.getSigners();
    let collector = singers[1]

    // TO ADD
    let proof = ""
    let nullifierHash = ""

    let airdropContract = await hre.ethers.getContractAt("PrivateAirdrop", AIRDROP_ADDR)
    let tx = await airdropContract.connect(collector).collectAirdrop(proof, nullifierHash);
    await tx.wait();
    console.log(`Proof verified => NFT succesfully collected by ${collector.address}!`)

}

main().then(() => process.exit(0))
    .catch(e => {
        console.error(e);
        process.exit(-1);
    })