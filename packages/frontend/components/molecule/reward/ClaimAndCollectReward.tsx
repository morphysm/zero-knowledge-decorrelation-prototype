import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';

import ClaimAndCollect from './ClaimAndCollect';
import {
  getReward,
  RewardType,
} from '../../../services/ApproveContractService';
import { rewardTypeToString } from '../../../utils/RewardTypes';

interface ClaimAndCollectApprovalProps {
  id: string;
}

enum RewardState {
  Eligable = 'ELIGABLE',
  Approved = 'APPROVED',
  // Claimed = 'CLAIMED',
  // Collected = 'COLLECTED',
}

const ClaimAndCollectReward: React.FC<ClaimAndCollectApprovalProps> = ({
  id,
}: ClaimAndCollectApprovalProps) => {
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

  if (
    rewardState === RewardState.Eligable ||
    rewardType == undefined ||
    rewardValue === undefined
  ) {
    return <span>Waiting for approval</span>;
  }

  return (
    <span>
      RewardType: {rewardTypeToString(rewardType)} RewardValue:{' '}
      {rewardTypeToString(rewardValue)}
      <ClaimAndCollect id={id} />
    </span>
  );
};

export default ClaimAndCollectReward;
