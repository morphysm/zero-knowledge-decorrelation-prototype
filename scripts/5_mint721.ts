// Mint a setofNFT to the privateAidrop contract
const hre = require('hardhat');

async function main() {
  let ERC721_ADDR = '0x0165878A594ca255338adfa4d48449f69242Eb8F'; // TO MODIFTY
  let AIRDROP_ADDR = '0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6'; // TO MODIFTY
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
