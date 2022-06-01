import type { NextPage } from 'next';
import { useState } from 'react';

import { pedersenHashPreliminary, toHex } from 'zkp-merkle-airdrop-lib';
import { postPreCommitment } from '../services/airdropService';

import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const [nullifier, setNullifier] = useState(
    '0x00202a03cea47b7918a36f12e6522c88f8fbcc9f74e07d529e9ce8f3a113ea87'
  );
  const [secret, setSecret] = useState(
    '0x00c46daf8a91c6b69e260765036de0ccf4b2e1cfe063ca630a6611f13adadee0'
  );
  const [preCommitment, setPreCommitment] = useState('');
  const [reward, setReward] = useState('');

  const handleClick = async () => {
    try {
      const preCommitment = await pedersenHashPreliminary(
        BigInt(nullifier),
        BigInt(secret)
      );
      setPreCommitment(toHex(preCommitment));
    } catch (err) {
      console.log(err);
    }
  };

  const handleSendPreCommitmentClick = async () => {
    try {
      const reward = await postPreCommitment(preCommitment);
      setReward(reward);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='App'>
      <form>
        <label htmlFor='nullifier'>Nullifier</label>
        <input
          type='text'
          id='nullifier'
          name='nullifier'
          value={nullifier}
          onChange={(e) => setNullifier(e.target.value)}
        />
        <label htmlFor='secret'>Secret</label>
        <input
          type='text'
          id='secret'
          name='secret'
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
        />
        <input
          type='text'
          id='preCommitment'
          name='preCommitment'
          value={preCommitment}
          onChange={(e) => setPreCommitment(e.target.value)}
        />
      </form>
      <button onClick={handleClick}>Generate Precommitment</button>
      <button onClick={handleSendPreCommitmentClick}>Send Precommitment</button>
      <p>Reward: {reward}</p>
    </div>
  );
};

export default Home;
