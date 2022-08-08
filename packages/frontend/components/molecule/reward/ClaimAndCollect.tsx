import React from 'react';
import router from 'next/router';

import Button from '../../atoms/button/Button';

interface ClainAndCollectProps {
  id: string;
}

const ClainAndCollect: React.FC<ClainAndCollectProps> = ({ id }) => {
  const handleClaimClick = (rewardId: string) => {
    router.push(`/airdrop/claim/${rewardId}`);
  };

  const handleCollectClick = async (rewardId: string) => {
    router.push(`/airdrop/collect/${rewardId}`);
  };

  return (
    <span>
      <Button onClick={() => handleClaimClick(id)}>Claim</Button>
      <Button onClick={() => handleCollectClick(id)}>Collect</Button>
    </span>
  );
};

export default ClainAndCollect;
