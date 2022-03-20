// Mint a setofNFT to the privateAidrop contract
const hre = require("hardhat");

async function main() {
    let ERC721_ADDR = "0x150ee68f8c944f5263f40E986571978CDb45c4E5";
    let AIRDROP_ADDR = "0x5948fb7e3510a194f955C80f1361837bf37B3fb8";
    let zekoNFT = await hre.ethers.getContractAt("ZekoGenerativeNFT", ERC721_ADDR)
    let daoName = "Duomint"
    let daoRole = "Hardcore Contributor"
    let quantity = 12;
    let tx = await zekoNFT.mintRoleToAirdrop(daoName, daoRole, quantity, AIRDROP_ADDR);
    tx.wait();
    console.log(await zekoNFT.tokenURI(3))
}

main().then(() => process.exit(0))
    .catch(e => {
        console.error(e);
        process.exit(-1);
    })