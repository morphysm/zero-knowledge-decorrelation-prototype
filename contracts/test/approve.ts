import { ethers } from "hardhat";
import { Signer, utils } from "ethers";
const { expect } = require("chai");

import { Approve } from "../typechain";

describe("Approve", function () {
  let accounts: Signer[];
  let approveContract: Approve;

  beforeEach(async function () {
    accounts = await ethers.getSigners();

    const approveFactory = await ethers.getContractFactory("Approve");
    approveContract = await approveFactory.deploy();
  });

  it("should allow the owner to add a reward", async () => {
    // GIVEN
    const rewardId = utils.formatBytes32String("1");
    const reward = utils.formatBytes32String("NFT_1");

    // WHEN
    const tx = await approveContract.addReward(rewardId, reward);
    await tx.wait();

    const storedReward = await approveContract.rewards(rewardId);

    // THEN
    expect(storedReward).equal(reward);
  });

  it("should not allow a non owner to add a reward", async () => {
    // GIVEN
    const rewardId = utils.formatBytes32String("1");
    const reward = utils.formatBytes32String("NFT_1");
    const nonOwner = accounts[1];

    // WHEN
    const tx = approveContract.connect(nonOwner).addReward(rewardId, reward);

    // THEN
    await expect(tx).to.be.reverted;
  });

  it("should not allow a non owner to read a reward", async () => {
    // GIVEN
    const rewardId = utils.formatBytes32String("1");
    const reward = utils.formatBytes32String("NFT_1");
    const nonOwner = accounts[1];

    // WHEN
    const tx1 = await approveContract.addReward(rewardId, reward);
    await tx1.wait();
    const storedReward = await approveContract.connect(nonOwner).rewards(rewardId);

    // THEN
    expect(storedReward).equal(reward);
  });

  it("should not allow a non owner to read a empty reward", async () => {
    // GIVEN
    const rewardId = utils.formatBytes32String("1");
    const reward = "0x0000000000000000000000000000000000000000000000000000000000000000";
    const nonOwner = accounts[1];

    // WHEN
    const storedReward = await approveContract.connect(nonOwner).rewards(rewardId);

    // THEN
    expect(storedReward).equal(reward);
  });
});
