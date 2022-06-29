import { ethers } from "hardhat";
import { Signer } from "ethers";
const { expect } = require("chai");

import { Approved } from "../typechain";

describe.only("Airdrop", function () {
  let accounts: Signer[];
  let approvedContract: Approved;

  beforeEach(async function () {
    accounts = await ethers.getSigners();

    const approvedFactory = await ethers.getContractFactory("Approved");
    approvedContract = await approvedFactory.deploy();
  });

  it("should allow the owner to add a reward", async () => {
    // GIVEN
    const rewardId = "1";
    const reward = "NFT_1";

    // WHEN
    const tx = await approvedContract.addReward(rewardId, reward);
    await tx.wait();

    const storedReward = await approvedContract.rewards(rewardId);

    // THEN
    expect(storedReward).equal(reward);
  });

  it("should not allow a non owner to add a reward", async () => {
    // GIVEN
    const rewardId = "1";
    const reward = "NFT_1";
    const nonOwner = accounts[1];

    // WHEN
    const tx = approvedContract.connect(nonOwner).addReward(rewardId, reward);

    // THEN
    await expect(tx).to.be.reverted;
  });
});
