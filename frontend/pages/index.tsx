import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

import { SessionContext } from '../context/SessionProvider';
import { getRewards } from '../services/AirdropService';

import Button from '../components/atoms/button/Button';

import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const router = useRouter();
  const { bearerToken } = useContext(SessionContext);

  const [isLoading, setLoading] = useState(false);

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

  const handleClaimClick = (rewardId: string) => {
    router.push(`/airdrop/claim/${rewardId}`);
  };

  const handleCollectClick = async (rewardId: string) => {
    router.push(`/airdrop/collect/${rewardId}`);
  };

  if (isLoading)
    return (
      <div className={styles.padding}>
        <p>Loading...</p>
      </div>
    );
  if (!user)
    return (
      <div className={styles.padding}>
        <p>No reward data</p>
      </div>
    );

  return (
    <div className={styles.padding}>
      <h3>Rewards:</h3>
      <ul className={styles.list}>
        {rewards.map((reward, i) => (
          <li key={`reward_${i}`}>
            <span>{reward.id}</span> <span>{reward.value}</span>{' '}
            <span>{reward.date}</span> <span>{reward.url}</span>{' '}
            {reward.claimed ? (
              <span>
                {' '}
                <Button onClick={() => handleCollectClick(reward.id)}>
                  Collect
                </Button>
              </span>
            ) : (
              <Button onClick={() => handleClaimClick(reward.id)}>Claim</Button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
