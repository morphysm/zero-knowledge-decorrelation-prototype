const hre = require("hardhat");
import { BigNumber } from "@ethersproject/bignumber";
import { PrivateAirdrop } from "../typechain";
import { readMerkleTreeAndSourceFromFile } from "../utils/TestUtils";
import { toHex } from "zkp-merkle-airdrop-lib";

/**
 * Deploys a test set of contracts: ERC721, Verifier, PrivateAirdrop
 */
async function main() {

    let NUM_ERC721_PER_REDEMPTION = 1;
    let merkleTreeAndSource = readMerkleTreeAndSourceFromFile("./test/temp/mt_keys_32.txt");
    let merkleTree = merkleTreeAndSource.merkleTree;

    // HERE I NEED TO DEPLOY MY ERC721 contract 
    let zekoNFTFactory = await hre.ethers.getContractFactory("ZekoGenerativeNFT")
    let zekoNFT = await zekoNFTFactory.deploy()
    console.log(`ERC721 address: ${zekoNFT.address}`)

    // 
    let plonkFactory = await hre.ethers.getContractFactory("PlonkVerifier")
    let plonk = await plonkFactory.deploy()
    console.log(`PlonkVerifier contract address: ${plonk.address}`)

    let mainFactory = await hre.ethers.getContractFactory("PrivateAirdrop")
    let privateAirdrop: PrivateAirdrop = (
        await mainFactory.deploy(
            zekoNFT.address,
            BigNumber.from(NUM_ERC721_PER_REDEMPTION),
            plonk.address, 
            toHex(merkleTree.root.val))) as PrivateAirdrop
    console.log(`PrivateAirdrop contract address: ${privateAirdrop.address}`)
}

main()
    .then(() => process.exit(0))
    .catch(e => {
        console.error(e);
        process.exit(1);
    })