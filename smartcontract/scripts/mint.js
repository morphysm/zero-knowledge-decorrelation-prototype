// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const deployedContract = '0xD268d358461d328f95FB8EDB0fFa365E44c512eE'
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  nftTestURI='ipfs://bafyreiehe36tssuj2ofrcxu22vzsk3yeu4xcx3li3xfnjp6y2rtpgj7mze/metadata.json'

  const nft = await hre.ethers.getContractAt('ZekoNFT', deployedContract);
  // We get the contract to deploy

  await nft.mintARole(nftTestURI, '1');
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });