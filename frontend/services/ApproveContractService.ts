import { ethers, utils } from 'ethers';
import { Approve__factory } from 'contracts/typechain';
import { getApproveAddress } from './AddressService';

interface ApprovedResponse {
  approved: boolean;
  value?: string;
}

// TODO naming
export const getValue = async (rewardId: string): Promise<ApprovedResponse> => {
  if (!window.ethereum) {
    throw new Error('could not connect to metamask');
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const approve = Approve__factory.connect(
    await getApproveAddress(provider),
    provider
  );

  const value = await approve.rewards(utils.formatBytes32String(rewardId));
  if (
    value ===
    '0x0000000000000000000000000000000000000000000000000000000000000000'
  ) {
    return { approved: false };
  }
  return { approved: true, value: utils.parseBytes32String(value) };
};

export const getOwner = async (): Promise<string> => {
  if (!window.ethereum) {
    throw new Error('could not connect to metamask');
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const approve = Approve__factory.connect(
    await getApproveAddress(provider),
    provider
  );

  const owner = await approve.owner();
  return owner;
};

export const postApproval = async (
  rewardId: string,
  reward: string
): Promise<void> => {
  if (!window.ethereum) {
    throw new Error('could not connect to metamask');
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const approve = Approve__factory.connect(
    await getApproveAddress(provider),
    signer
  );

  // TODO check for max length of reward (32 bytes )
  const tx = await approve.addReward(
    utils.formatBytes32String(rewardId),
    utils.formatBytes32String(reward)
  );
  await tx.wait();

  return;
};
