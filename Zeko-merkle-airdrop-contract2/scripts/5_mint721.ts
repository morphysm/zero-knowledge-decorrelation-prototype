// Mint a setofNFT to the privateAidrop contract
const hre = require("hardhat");

async function main() {


    let ERC721_ADDR = "0x5504eB3746C6f3120E442F5fbF0c913F951d6130";
    let AIRDROP_ADDR = "0xf4955374242F4FD04683f4BbEb45474389BC59A8";
    let zekoNFT = await hre.ethers.getContractAt("ZekoGenerativeNFT", ERC721_ADDR)
    let daoName = "Zeko Badges"
    let daoRole = "Hardcore Contributor"
    let quantity = 7;
    let tx = await zekoNFT.mintRoleToAirdrop(daoName, daoRole, quantity, AIRDROP_ADDR);
    tx.wait();
    console.log(`# ${quantity} NFTs succefully minted and trasferred to ${AIRDROP_ADDR}` )
}

main().then(() => process.exit(0))
    .catch(e => {
        console.error(e);
        process.exit(-1);
    })