import { ethers, utils } from 'ethers';
import { ApprovedRewards__factory } from 'contracts/typechain';
import { getApproveAddress } from './AddressService';

export enum RewardType {
  ZEKONFT = 0,
  FAMEDTOKEN = 1,
}

interface ApprovedResponse {
  approved: boolean;
  type?: RewardType;
  value?: number;
}

// TODO naming
export const getReward = async (
  rewardId: string
): Promise<ApprovedResponse> => {
  console.log(window.ethereum);
  if (!window.ethereum) {
    throw new Error('could not connect to metamask');
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const approve = ApprovedRewards__factory.connect(
    await getApproveAddress(provider),
    provider
  );

  const [approved, type, value] = await approve.rewards(
    utils.formatBytes32String(rewardId)
  );

  if (!approved) {
    return { approved };
  }
  return { approved, type, value: value.toNumber() };
};

export const getOwner = async (): Promise<string> => {
  if (!window.ethereum) {
    throw new Error('could not connect to metamask');
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const approve = ApprovedRewards__factory.connect(
    await getApproveAddress(provider),
    provider
  );

  const owner = await approve.owner();
  return owner;
};

export const postApproval = async (
  rewardId: string,
  rewardType: number,
  rewardValue: number
): Promise<void> => {
  if (!window.ethereum) {
    throw new Error('could not connect to metamask');
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const approve = ApprovedRewards__factory.connect(
    await getApproveAddress(provider),
    signer
  );

  // TODO check for max length of reward (32 bytes )
  const tx = await approve.addReward(
    utils.formatBytes32String(rewardId),
    rewardType,
    rewardValue
  );
  await tx.wait();

  return;
};
