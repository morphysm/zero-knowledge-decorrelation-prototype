// Mint a setofNFT to the privateAidrop contract
const hre = require("hardhat");

/** Collect an airdrop from the local merkle tree against deployed contract. */
async function main() {

    let ERC721_ADDR = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
    let AIRDROP_ADDR = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";
    let zekoNFT = await hre.ethers.getContractAt("ZekoGenerativeNFT", ERC721_ADDR)
    let airdropContract = await hre.ethers.getContractAt("PrivateAirdrop", AIRDROP_ADDR)
    let daoName = "Uniswap"
    let daoRole = "core Developer"
    let quantity = 7;
    let tx = await zekoNFT.mintRoleToAirdrop(daoName, daoRole, quantity, AIRDROP_ADDR);
    tx.wait();
    console.log(await zekoNFT.tokenURI(7));
    console.log(await zekoNFT.TransferCounterForTokenId(1));
    console.log(await airdropContract.nextTokenIdToBeAirdropped());
}

main().then(() => process.exit(0))
    .catch(e => {
        console.error(e);
        process.exit(-1);
    })