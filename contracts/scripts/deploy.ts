// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import hre, { ethers } from "hardhat";
const { BigNumber } = ethers;

import { PrivateAirdrop } from "../typechain/PrivateAirdrop";

import {
  getMerkleTreeFromPublicListOfCommitments,
  getMerkleRoot,
} from "../utils/TestUtils";
import {
  isOfTypeNetworkName,
  putContractAddresses,
} from "../utils/AddressStore";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  const networkName = hre.network.name;
  if (!isOfTypeNetworkName(networkName)) {
    throw new Error(
      "unexpected network name, please verify and update list of supported networks"
    );
  }

  const NUM_ERC721_PER_REDEMPTION = 1;
  const inputFileName = "../backend/public/publicCommitments.txt";
  const treeHeight = 5;

  const mt = await getMerkleTreeFromPublicListOfCommitments(
    inputFileName,
    treeHeight
  );
  const merkconstreeRoot = getMerkleRoot(mt);

  // DEPLOY ERC721 contract
  const zekoNFTFactory = await ethers.getContractFactory("ZekoGenerativeNFT");
  const zekoNFT = await zekoNFTFactory.deploy();
  console.log(`ERC721 address: ${zekoNFT.address}`);

  // DEPLOY PLONK VERIFIER
  const plonkFactory = await ethers.getContractFactory("PlonkVerifier");
  const plonk = await plonkFactory.deploy();
  console.log(`Plonk Verifier contract address: ${plonk.address}`);

  // DEPLOY PRIVATE AIRDROP
  const mainFactory = await ethers.getContractFactory("PrivateAirdrop");
  const privateAirdrop = (await mainFactory.deploy(
    zekoNFT.address,
    BigNumber.from(NUM_ERC721_PER_REDEMPTION),
    plonk.address,
    merkconstreeRoot
  )) as PrivateAirdrop;
  console.log(
    `PrivateAirdrop contract address: ${privateAirdrop.address} merkconstree root: ${merkconstreeRoot}`
  );

  putContractAddresses(
    zekoNFT.address,
    plonk.address,
    privateAirdrop.address,
    networkName
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
