import React, { useState } from 'react';
import {
  postApproval,
  RewardType,
} from '../../../services/ApproveContractService';
import Button from '../../atoms/button/Button';

interface ApproveButtonProps {
  id: string;
  suggestedType: RewardType;
  suggestedValue: number;
}

const ApproveButton: React.FC<ApproveButtonProps> = ({
  id,
  suggestedType,
  suggestedValue,
}) => {
  const [type, setType] = useState<RewardType>(suggestedType);
  const [value, setValue] = useState<number>(suggestedValue);

  const handleApproveClick = (rewardId: string) => {
    postApproval(rewardId, type, value);
  };

  return (
    <span>
      <form>
        <label htmlFor='type'>RewardType: </label>
        <select
          value={type}
          onChange={(e) => setType(parseInt(e.target.value, 10))}
        >
          <option value={RewardType.ZEKONFT}>NFT</option>
          <option value={RewardType.FAMEDTOKEN}>Famed Token</option>
        </select>
        <label htmlFor='value'>Value: </label>
        <input
          type='text'
          id='value'
          name='value'
          value={value}
          onChange={(e) => setValue(parseInt(e.target.value, 10))}
        />
      </form>
      <Button onClick={() => handleApproveClick(id)}>Approve</Button>
    </span>
  );
};

export default ApproveButton;
