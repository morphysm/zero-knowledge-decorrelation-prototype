// Mint a setofNFT to the privateAidrop contract
const hre = require("hardhat");
import { readFileSync } from "fs";
import { readMerkleTreeAndSourceFromFile } from "../utils/TestUtils";
import { generateProofCallData, pedersenHash, toHex } from "zkp-merkle-airdrop-lib";

/** Collect an airdrop from the local merkle tree against deployed contract. */
async function main() {

    let ERC721_ADDR = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    let AIRDROP_ADDR = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
    let zekoNFT =  await hre.ethers.getContractAt("ZekoGenerativeNFT", ERC721_ADDR)
    let userText = "Core developer at uniswap V3"
    await zekoNFT.mint(userText, AIRDROP_ADDR);
    console.log(await zekoNFT.tokenURI(1)); 
}

main().then(() => process.exit(0))
    .catch(e => {
        console.error(e);
        process.exit(-1);
    })