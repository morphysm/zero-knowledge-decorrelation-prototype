import { ApprovedRewards__factory } from '../typechain';
import { getApproveAddress } from './AddressService';
import { getProvider } from './ProviderService';
import { toHex } from '@famed-airdrop-prototype/zkp-merkle-airdrop-lib';

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
  const {provider, signer} = getProvider()
  const approve = ApprovedRewards__factory.connect(
    await getApproveAddress(provider),
    signer
  );

  const [approved, type, value] = await approve.rewards(
    toHex(BigInt(rewardId))
  );

  if (!approved) {
    return { approved };
  }
  return { approved, type, value: value.toNumber() };
};

export const getOwner = async (): Promise<string> => {
  const {provider, signer} = getProvider()
  const approve = ApprovedRewards__factory.connect(
    await getApproveAddress(provider),
    signer
  );

  const owner = await approve.owner();
  return owner;
};

export const postApproval = async (
  rewardId: string,
  rewardType: number,
  rewardValue: number
): Promise<void> => {
  const {provider, signer} = getProvider()
  const approve = ApprovedRewards__factory.connect(
    await getApproveAddress(provider),
    signer
  );

  // TODO check for max length of reward (32 bytes )
  const tx = await approve.addReward(
    toHex(BigInt(rewardId)),
    rewardType,
    rewardValue
  );
  await tx.wait();

  return;
};
