const hre = require("hardhat");
import { BigNumber } from "@ethersproject/bignumber";
import { PrivateAirdrop } from "../typechain";

/**
 * Deploys a test set of contracts: ERC721, Verifier, PrivateAirdrop
 */
async function main() {

    let NUM_ERC721_PER_REDEMPTION = 1;
    let merkleTreeRoot = "0x278861ed6103a39717d415bec985d336cca450c01e5e2782c33949ba10b986a5"

    // DEPLOY ERC721 contract 
    let zekoNFTFactory = await hre.ethers.getContractFactory("ZekoGenerativeNFT")
    let zekoNFT = await zekoNFTFactory.deploy()
    console.log(`ERC721 address: ${zekoNFT.address}`)

    // DEPLOY PLONK VERIFIER
    let plonkFactory = await hre.ethers.getContractFactory("PlonkVerifier")
    let plonk = await plonkFactory.deploy()
    console.log(`Plonk Verifier contract address: ${plonk.address}`)

    // DEPLOY PRIVATE AIRDROP
    let mainFactory = await hre.ethers.getContractFactory("PrivateAirdrop")
    let privateAirdrop: PrivateAirdrop = (
        await mainFactory.deploy(
            zekoNFT.address,
            BigNumber.from(NUM_ERC721_PER_REDEMPTION),
            plonk.address,
            merkleTreeRoot)) as PrivateAirdrop
    console.log(`PrivateAirdrop contract address: ${privateAirdrop.address}`)
}

main()
    .then(() => process.exit(0))
    .catch(e => {
        console.error(e);
        process.exit(1);
    })