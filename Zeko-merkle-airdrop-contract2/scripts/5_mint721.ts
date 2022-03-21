// Mint a setofNFT to the privateAidrop contract
const hre = require("hardhat");

async function main() {

    // TO ADD
    let ERC721_ADDR = "";
    let AIRDROP_ADDR = "";
    let zekoNFT = await hre.ethers.getContractAt("ZekoGenerativeNFT", ERC721_ADDR)
    let daoName = ""
    let daoRole = ""
    let quantity = "";
    let tx = await zekoNFT.mintRoleToAirdrop(daoName, daoRole, quantity, AIRDROP_ADDR);
    tx.wait();
    console.log(`# ${quantity} NFTs succefully minted and trasferred to ${AIRDROP_ADDR}` )
}

main().then(() => process.exit(0))
    .catch(e => {
        console.error(e);
        process.exit(-1);
    })