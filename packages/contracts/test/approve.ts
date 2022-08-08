import { ethers } from "hardhat";
import { Signer, utils } from "ethers";
const { expect } = require("chai");

import { ApprovedRewards } from "../typechain";

describe("Approve", function () {
  let accounts: Signer[];
  let approvedRewardsContract: ApprovedRewards;

  beforeEach(async function () {
    accounts = await ethers.getSigners();

    const approvedRewardsFactory = await ethers.getContractFactory("ApprovedRewards");
    approvedRewardsContract = await approvedRewardsFactory.deploy();
  });

  it("should allow the owner to add a reward", async () => {
    // GIVEN
    const rewardId = utils.formatBytes32String("1");
    const rewardType = 0;
    const rewardValue = 1;

    // WHEN
    const tx = await approvedRewardsContract.addReward(rewardId, rewardType, rewardValue);
    await tx.wait();

    const storedReward = await approvedRewardsContract.rewards(rewardId);

    // THEN
    expect(storedReward.approved).equal(true);
    expect(storedReward.rewardType).equal(rewardType);
    expect(storedReward.value).equal(rewardValue);
  });

  it("should not allow a non owner to add a reward", async () => {
    // GIVEN
    const rewardId = utils.formatBytes32String("1");
    const rewardType = 0;
    const rewardValue = 1;
    const nonOwner = accounts[1];

    // WHEN
    const tx = approvedRewardsContract
      .connect(nonOwner)
      .addReward(rewardId, rewardType, rewardValue);

    // THEN
    await expect(tx).to.be.reverted;
  });

  it("should not allow a non owner to read a reward", async () => {
    // GIVEN
    const rewardId = utils.formatBytes32String("1");
    const rewardType = 0;
    const rewardValue = 1;
    const nonOwner = accounts[1];

    // WHEN
    const tx1 = await approvedRewardsContract.addReward(rewardId, rewardType, rewardValue);
    await tx1.wait();
    const storedReward = await approvedRewardsContract.connect(nonOwner).rewards(rewardId);

    // THEN
    expect(storedReward.approved).equal(true);
    expect(storedReward.rewardType).equal(rewardType);
    expect(storedReward.value).equal(rewardValue);
  });

  it("should allow a non owner to read a empty reward", async () => {
    // GIVEN
    const rewardId = utils.formatBytes32String("1");
    const rewardType = 0;
    const rewardValue = 0;
    const nonOwner = accounts[1];

    // WHEN
    const storedReward = await approvedRewardsContract.connect(nonOwner).rewards(rewardId);

    // THEN
    expect(storedReward.approved).equal(false);
    expect(storedReward.rewardType).equal(rewardType);
    expect(storedReward.value).equal(rewardValue);
  });
});
