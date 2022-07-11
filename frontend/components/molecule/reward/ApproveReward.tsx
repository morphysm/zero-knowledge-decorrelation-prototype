import React, { useEffect, useState } from 'react';
import {
  getReward,
  RewardType,
} from '../../../services/ApproveContractService';

import Typography from '@mui/material/Typography';
import ApproveButton from './ApproveButton';

interface RewardApprovalProps {
  id: string;
}

enum RewardState {
  Eligable = 'ELIGABLE',
  Approved = 'APPROVED',
  // Claimed = 'CLAIMED',
  // Collected = 'COLLECTED',
}

const Reward: React.FC<RewardApprovalProps> = ({ id }: RewardApprovalProps) => {
  const [rewardState, setRewardState] = useState<RewardState>();
  const [rewardType, setRewardType] = useState<RewardType | undefined>(
    undefined
  );
  const [rewardValue, setRewardValue] = useState<number | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    loadApproval().then(() => {
      setLoading(false);
    });
  }, [id]);

  // TODO investigate if we can set claimed and collected states
  const loadApproval = async (): Promise<void> => {
    let approved: boolean | undefined;
    let type: RewardType | undefined;
    let value: number | undefined;
    try {
      ({ approved, type, value } = await getReward(id));
    } catch (err) {
      console.log(err);
      setErrorMessage('Failed to load approval.');
    }

    if (approved) {
      setRewardState(RewardState.Approved);
      setRewardType(type);
      setRewardValue(value);
      return;
    }

    setRewardState(RewardState.Eligable);
  };

  if (loading) {
    return <span>Loading...</span>;
  }

  if (errorMessage) {
    return <Typography color='red'>Error: {errorMessage}</Typography>;
  }

  if (rewardState === RewardState.Approved) {
    return (
      <span>
        Approved, Type: {rewardType}, Value: {rewardValue}
      </span>
    );
  }

  // TODO
  return (
    <ApproveButton
      id={id}
      suggestedType={RewardType.ZEKONFT}
      suggestedValue={1}
    />
  );
};

export default Reward;
