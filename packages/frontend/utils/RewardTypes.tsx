import { RewardType } from '../services/ApproveContractService';

export const rewardTypeToString = (rewardType: RewardType): string => {
  switch (rewardType) {
    case RewardType.ZEKONFT:
      return 'NFT';
    case RewardType.FAMEDTOKEN:
      return 'Famed Token';
    default:
      throw new Error('Unknown reward type');
  }
};
