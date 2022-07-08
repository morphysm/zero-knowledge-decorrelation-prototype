import Button from '../../atoms/button/Button';
import React, { useEffect, useState } from 'react';
import { getValue } from '../../../services/ApproveContractService';
import router from 'next/router';
import Typography from '@mui/material/Typography';

interface RewardApprovalProps {
  id: string;
}

enum RewardState {
  Eligable = 'ELIGABLE',
  Approved = 'APPROVED',
  Claimed = 'CLAIMED',
  Collected = 'COLLECTED',
}

const RewardApproval: React.FC<RewardApprovalProps> = ({
  id,
}: RewardApprovalProps) => {
  const [rewardState, setRewardState] = useState<RewardState>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    loadApproval().then((_rewardState: RewardState) => {
      setRewardState(_rewardState);
      setLoading(false);
    });
  }, [id]);

  // TODO investigate if we can set claimed and collected states
  const loadApproval = async (): Promise<RewardState> => {
    let approved, value;
    try {
      ({ approved, value } = await getValue(id));
    } catch (err) {
      console.log(err);
      setErrorMessage('Failed to load approval.');
    }

    if (approved) {
      return RewardState.Approved;
    }

    return RewardState.Eligable;
  };

  const handleClaimClick = (rewardId: string) => {
    router.push(`/airdrop/claim/${rewardId}`);
  };

  const handleCollectClick = async (rewardId: string) => {
    router.push(`/airdrop/collect/${rewardId}`);
  };

  if (loading) {
    return <span>Loading...</span>;
  }

  if (errorMessage) {
    return <Typography color='red'>Error: {errorMessage}</Typography>;
  }

  if (rewardState === RewardState.Eligable) {
    return <span>Waiting for approval</span>;
  }

  return (
    <span>
      <Button onClick={() => handleClaimClick(id)}>Claim</Button>
      <Button onClick={() => handleCollectClick(id)}>Collect</Button>
    </span>
  );
};

export default RewardApproval;
