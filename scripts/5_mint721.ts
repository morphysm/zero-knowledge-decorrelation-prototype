// Mint a setofNFT to the privateAidrop contract
const hre = require('hardhat');

async function main() {
  let ERC721_ADDR = '0x9A9f2CCfdE556A7E9Ff0848998Aa4a0CFD8863AE'; // TO MODIFTY
  let AIRDROP_ADDR = '0x3Aa5ebB10DC797CAC828524e59A333d0A371443c'; // TO MODIFTY
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
