import { ethers } from "hardhat";
import { Signer } from "ethers";
import { PrivateAirdrop } from "../typechain";

const REDEPTIONS = BigInt(1);

describe("Token", function () {
  let accounts: Signer[];
  let airdropContract: PrivateAirdrop;

  beforeEach(async function () {
    accounts = await ethers.getSigners();

    const zekoGenerativeNFTFactory = await ethers.getContractFactory(
      "ZekoGenerativeNFT"
    );
    const zekoGenerativeNFTContract = await zekoGenerativeNFTFactory.deploy();

    const plonkFactory = await ethers.getContractFactory("PlonkVerifier");
    const plonkContract = await plonkFactory.deploy();

    const airdropFactory = await ethers.getContractFactory("PrivateAirdrop");
    airdropContract = await airdropFactory.deploy(
      zekoGenerativeNFTContract.address,
      REDEPTIONS
    );
  });

  it("should do something right", async function () {
    // Do something with the accounts
  });
});

describe("Token contract", function () {
  it("Deployment should assign the total supply of tokens to the owner", async function () {
    const [owner] = await ethers.getSigners();

    const ownerBalance = await hardhatToken.balanceOf(owner.address);
    expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
  });
});
