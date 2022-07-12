import { ethers } from "hardhat";
import { Signer, utils } from "ethers";
const { expect } = require("chai");

import { FamedToken } from "../typechain";

describe.only("FamedToken", function () {
  let accounts: Signer[];
  let mockPrivateAirdrop: Signer;
  let famedTokenContract: FamedToken;

  beforeEach(async function () {
    accounts = await ethers.getSigners();
    mockPrivateAirdrop = accounts[1];

    const famedTokenFactory = await ethers.getContractFactory("FamedToken");
    const mockPrivateAidropAddress = await mockPrivateAirdrop.getAddress();
    famedTokenContract = await famedTokenFactory.deploy(mockPrivateAidropAddress);
  });

  it("should allow the private airdrop to mint new tokens", async () => {
    // GIVEN
    const amount = 100;
    const receiver = await accounts[2].getAddress();
    // WHEN
    const tx = await famedTokenContract.connect(mockPrivateAirdrop).mint(receiver, amount);
    await tx.wait();
    // THEN
    expect(await famedTokenContract.balanceOf(receiver)).equal(amount);
  });

  it("should not allow somebody else then the airdrop to mint", async () => {
    // GIVEN
    const amount = 100;
    const receiver = await accounts[2].getAddress();
    // WHEN
    const tx = famedTokenContract.connect(accounts[3]).mint(receiver, amount);
    // THEN
    await expect(tx).to.be.reverted;
  });
});
