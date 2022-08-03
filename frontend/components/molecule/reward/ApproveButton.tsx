import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
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
    <Stack component="form" gap={2}>
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Reward Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={type}
          label="Reward Type"
          onChange={(e) => setType(e.target.value as number)}
        >
          <MenuItem value={RewardType.ZEKONFT}>NFT</MenuItem>
          <MenuItem value={RewardType.FAMEDTOKEN}>Famed Token</MenuItem>
        </Select>
      </FormControl>
        <TextField
          required
          id="outlined-required"
          label={type == RewardType.ZEKONFT ? 'NFT with ID' : 'Tokens'}
          defaultValue={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(parseInt(e.target.value, 10))}
        />
      <Button onClick={() => handleApproveClick(id)}>Approve</Button>
    </Stack>
  );
};

export default ApproveButton;
