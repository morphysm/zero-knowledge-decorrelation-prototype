// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import hre, { ethers } from "hardhat";

import { getMerkleTreeFromPublicListOfCommitments, getMerkleRoot } from "../utils/TestUtils";
import { isOfTypeNetworkName, putContractAddresses } from "../utils/AddressStore";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  const networkName = hre.network.name;
  if (!isOfTypeNetworkName(networkName)) {
    throw new Error("unexpected network name, please verify and update list of supported networks");
  }

  const NUM_ERC721_PER_REDEMPTION = 1;
  const inputFileName = "../backend/public/publicCommitments.txt";
  const treeHeight = 5;

  const mt = await getMerkleTreeFromPublicListOfCommitments(inputFileName, treeHeight);
  const merkleTreeRoot = getMerkleRoot(mt);

  // Deploy NFT contract
  const zekoGenerativeNFTFactory = await ethers.getContractFactory("ZekoGenerativeNFT");
  const zekoGenerativeNFTContract = await zekoGenerativeNFTFactory.deploy();

  // Deploy ZK verfication contract
  const plonkFactory = await ethers.getContractFactory("PlonkVerifier");
  const plonkContract = await plonkFactory.deploy();

  // Deploy approve contract
  const approveFactory = await ethers.getContractFactory("Approve");
  const approveContract = await approveFactory.deploy();

  // Deploy airdrop contract
  const airdropFactory = await ethers.getContractFactory("PrivateAirdrop");
  const airdropContract = await airdropFactory.deploy(
    zekoGenerativeNFTContract.address,
    NUM_ERC721_PER_REDEMPTION,
    plonkContract.address,
    approveContract.address,
    merkleTreeRoot
  );

  console.log(
    `PrivateAirdrop contract address: ${airdropContract.address} merkconstree root: ${merkleTreeRoot}`
  );

  putContractAddresses(
    zekoGenerativeNFTContract.address,
    plonkContract.address,
    airdropContract.address,
    approveContract.address,
    networkName
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
