// Mint a setofNFT to the privateAidrop contract
import { getContractAddresses } from "../utils/AddressStore";
const hre = require("hardhat");

async function main() {
  const addresses = getContractAddresses();
  const zekoNFT = await hre.ethers.getContractAt(
    "ZekoGenerativeNFT",
    addresses.nft
  );
  const daoName = "Zeko Badges"; // TO MODIFTY
  const daoRole = "Hardcore contributor"; // TO MODIFTY
  const quantity = "8"; // TO MODIFTY
  const tx = await zekoNFT.mintRoleToAirdrop(
    daoName,
    daoRole,
    quantity,
    addresses.privateAidrop
  );
  tx.wait();
  console.log(
    `# ${quantity} NFTs succefully minted and trasferred to ${addresses.privateAidrop}`
  );
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(-1);
  });
