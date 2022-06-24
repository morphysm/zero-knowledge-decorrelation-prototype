import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

import { SessionContext } from '../context/SessionProvider';
import { getRewards } from '../services/AirdropService';

import Button from '../components/atoms/button/Button';
import LoadingButton from '../components/atoms/loadingButton/LoadingButton';

import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const router = useRouter();
  const { bearerToken } = useContext(SessionContext);

  const [isLoading, setLoading] = useState(false);

  const [user, setUser] = useState<User | null>(null);
  const [rewards, setRewards] = useState<Reward[]>([]);

  const [loadingCollect, setLoadingCollect] = useState<boolean>(false);

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

  if (isLoading) return <p>Loading...</p>;
  if (!user) return <p>No reward data</p>;

  return (
    <div className={styles.home}>
      <h3>Rewards:</h3>
      <ul className={styles.list}>
        {rewards.map((reward, i) => (
          <li key={`reward_${i}`}>
            <span>{reward.id}</span> <span>{reward.value}</span>{' '}
            <span>{reward.date}</span> <span>{reward.url}</span>{' '}
            {reward.claimed ? (
              <span>
                {' '}
                <LoadingButton
                  loading={loadingCollect}
                  onClick={() => handleCollectClick(reward.id)}
                >
                  Collect
                </LoadingButton>
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
