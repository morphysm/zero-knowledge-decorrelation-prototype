// Mint a setofNFT to the privateAidrop contract
const hre = require("hardhat");

async function main() {

    // TO ADD
    let ERC721_ADDR = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    let AIRDROP_ADDR = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
    let zekoNFT = await hre.ethers.getContractAt("ZekoGenerativeNFT", ERC721_ADDR)
    let daoName = "Zeko Badges"
    let daoRole = "Hardcore contributor"
    let quantity = "8";
    let tx = await zekoNFT.mintRoleToAirdrop(daoName, daoRole, quantity, AIRDROP_ADDR);
    tx.wait();
    console.log(`# ${quantity} NFTs succefully minted and trasferred to ${AIRDROP_ADDR}` )
}

main().then(() => process.exit(0))
    .catch(e => {
        console.error(e);
        process.exit(-1);
    })