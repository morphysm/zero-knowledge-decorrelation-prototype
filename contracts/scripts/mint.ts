// Mint a setofNFT to the privateAidrop contract
import {
  getContractAddresses,
  isOfTypeNetworkName,
} from "../utils/AddressStore";
const hre = require("hardhat");

async function main() {
  const networkName = hre.network.name;
  if (!isOfTypeNetworkName(networkName)) {
    throw new Error(
      "unexpected network name, please verify and update list of supported networks"
    );
  }

  const addresses = getContractAddresses(networkName);
  const zekoNFT = await hre.ethers.getContractAt(
    "ZekoGenerativeNFT",
    addresses.nft
  );
  const daoName = "Famed"; // TO MODIFTY
  const daoRole = "Famed contributor"; // TO MODIFTY
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
