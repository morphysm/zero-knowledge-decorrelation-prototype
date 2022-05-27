// Mint a setofNFT to the privateAidrop contract
const hre = require('hardhat');

async function main() {
  let ERC721_ADDR = '0xc0F115A19107322cFBf1cDBC7ea011C19EbDB4F8'; // TO MODIFTY
  let AIRDROP_ADDR = '0x34B40BA116d5Dec75548a9e9A8f15411461E8c70'; // TO MODIFTY
  let zekoNFT = await hre.ethers.getContractAt(
    'ZekoGenerativeNFT',
    ERC721_ADDR
  );
  let daoName = 'Zeko Badges'; // TO MODIFTY
  let daoRole = 'Hardcore contributor'; // TO MODIFTY
  let quantity = '8'; // TO MODIFTY
  let tx = await zekoNFT.mintRoleToAirdrop(
    daoName,
    daoRole,
    quantity,
    AIRDROP_ADDR
  );
  tx.wait();
  console.log(
    `# ${quantity} NFTs succefully minted and trasferred to ${AIRDROP_ADDR}`
  );
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(-1);
  });
