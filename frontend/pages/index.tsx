import type { NextPage } from 'next';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Button from '../components/atoms/button/Button';
import { SessionContext } from '../context/SessionProvider';

import { pedersenHashPreliminary, toHex } from 'zkp-merkle-airdrop-lib';
import { getRewards, postPreCommitment } from '../services/airdropService';

import styles from '../styles/Home.module.css';
import Navigation from '../components/organisms/navigation/Navigation';

const Home: NextPage = () => {
  const router = useRouter();
  const { bearerToken } = useContext(SessionContext);
  const [isLoading, setLoading] = useState(false);

  const [nullifier, setNullifier] = useState(
    '0x00202a03cea47b7918a36f12e6522c88f8fbcc9f74e07d529e9ce8f3a113ea87'
  );
  const [secret, setSecret] = useState(
    '0x00c46daf8a91c6b69e260765036de0ccf4b2e1cfe063ca630a6611f13adadee0'
  );
  const [preCommitment, setPreCommitment] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [rewards, setRewards] = useState<Reward[]>([]);

  useEffect(() => {
    if (bearerToken === '') {
      router.push('/auth/login');
    }

    setLoading(true);
    getRewards(bearerToken).then((data) => {
      setUser(data.user);
      setRewards(data.rewards);
      setLoading(false);
    });
  }, [bearerToken]);

  const handleClickGeneratePreCommitment = async () => {
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

  const handleClaimClick = async (rewardId: string) => {
    try {
      // TODO add nonce to protect against replay attacks
      const reward = await postPreCommitment(
        bearerToken,
        rewardId,
        preCommitment
      );
      // setReward(reward);
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (!user) return <p>No profile data</p>;

  return (
    <div className={styles.home}>
      <form className={styles.form}>
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
        <label htmlFor='secret'>Precommitment</label>
        <input
          type='text'
          id='preCommitment'
          name='preCommitment'
          value={preCommitment}
          onChange={(e) => setPreCommitment(e.target.value)}
        />
      </form>
      {preCommitment === '' && (
        <Button
          text='Generate Precommitment'
          onClick={handleClickGeneratePreCommitment}
        />
      )}
      <h3>Rewards:</h3>
      <ul>
        {rewards.map((reward) => (
          <li>
            <span>{reward.id}</span> <span>{reward.value}</span>{' '}
            <span>{reward.date}</span> <span>{reward.paid}</span>
            <span>{reward.url}</span>{' '}
            {preCommitment !== '' && (
              <Button
                text='Post Commitment'
                onClick={() => handleClaimClick(reward.id)}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
