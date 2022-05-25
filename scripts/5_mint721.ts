// Mint a setofNFT to the privateAidrop contract
const hre = require('hardhat');

async function main() {
  let ERC721_ADDR = '0x67d269191c92Caf3cD7723F116c85e6E9bf55933'; // TO MODIFTY
  let AIRDROP_ADDR = '0xc3e53F4d16Ae77Db1c982e75a937B9f60FE63690'; // TO MODIFTY
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
