import { ethers } from "hardhat";
import { Signer } from "ethers";
const { expect } = require("chai");

import { PrivateAirdrop, ZekoGenerativeNFT } from "../typechain";
import { getMerkleTreeFromPublicListOfCommitments } from "zkp-merkle-airdrop-lib";

const REDEPTIONS = BigInt(1);
const INPUT_FILE_NAME = "./test/publicCommitments.txt";
const TREE_HIGHT = 5;
const DAO_NAME = "Famed Badges";
const DAO_ROLE = "Famed Contributor";
const NFT_QUANTITY = 8;

describe("Airdrop", function () {
  let accounts: Signer[];
  let airdropContract: PrivateAirdrop;
  let zekoGenerativeNFTContract: ZekoGenerativeNFT;

  beforeEach(async function () {
    accounts = await ethers.getSigners();

    // Generate intial merkle tree and root
    const mt = await getMerkleTreeFromPublicListOfCommitments(INPUT_FILE_NAME, TREE_HIGHT);
    const merkleTreeRoot = mt.getRoot();

    // Deploy NFT contract
    const zekoGenerativeNFTFactory = await ethers.getContractFactory("ZekoGenerativeNFT");
    zekoGenerativeNFTContract = await zekoGenerativeNFTFactory.deploy();

    // Deploy ZK verfication contract
    const plonkFactory = await ethers.getContractFactory("PlonkVerifier");
    const plonkContract = await plonkFactory.deploy();

    // Deploy approve contract
    const approveFactory = await ethers.getContractFactory("ApprovedRewards");
    const aproveContract = await approveFactory.deploy();

    // Deploy airdrop contract
    const mockFamedTokenAddress = await accounts[1].getAddress();
    const airdropFactory = await ethers.getContractFactory("PrivateAirdrop");
    airdropContract = await airdropFactory.deploy(
      zekoGenerativeNFTContract.address,
      REDEPTIONS,
      plonkContract.address,
      aproveContract.address,
      mockFamedTokenAddress,
      merkleTreeRoot
    );

    // Mint NFTs
    await zekoGenerativeNFTContract.mintRoleToAirdrop(
      DAO_NAME,
      DAO_ROLE,
      NFT_QUANTITY,
      airdropContract.address
    );
  });

  it("should expect that the airdropped token is not transferable", async () => {
    // GIVEN
    const collector = accounts[2];
    const collectorAddress = await collector.getAddress();
    const receiverAddress = await accounts[4].getAddress();
    // WHEN
    const tx = zekoGenerativeNFTContract
      .connect(collector)
      .transferFrom(collectorAddress, receiverAddress, 1);
    // THEN
    await expect(tx).to.be.reverted;
  });

  it("should have token ID 2 as nextTokenIdToBeAirdropped after the first airdrop happened", async () => {
    // GIVEN
    await zekoGenerativeNFTContract.mintRoleToAirdrop(
      DAO_NAME,
      DAO_ROLE,
      NFT_QUANTITY,
      airdropContract.address
    );
    // WHEN
    const worldBaseTokenId = await airdropContract.worldBaseTokenId();
    // THEN
    expect(worldBaseTokenId.toNumber()).equal(NFT_QUANTITY + 1);
  });
});
