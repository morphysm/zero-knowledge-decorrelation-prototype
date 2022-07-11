import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

import { SessionContext } from '../context/SessionProvider';
import { getRewardsByUser } from '../services/AirdropService';

import styles from '../styles/Home.module.css';
import Reward from '../components/molecule/reward/ClaimAndCollectReward';
import Typography from '@mui/material/Typography';
import ClaimAndCollectReward from '../components/molecule/reward/ClaimAndCollectReward';

const Home: NextPage = () => {
  const router = useRouter();
  const { session } = useContext(SessionContext);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [rewards, setRewards] = useState<Repo[]>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (session === null) {
      router.push('/auth/login');
      return;
    }

    if (
      session.provider_token === null ||
      session.provider_token === undefined
    ) {
      setErrorMessage(
        'missing provider_token in session, please log out and login. If the issue persists, please contact contact@morphysm.com.'
      );
      return;
    }

    setLoading(true);
    getRewardsByUser(session.provider_token).then((data) => {
      setRewards(data.repos);
      setLoading(false);
    });
  }, [session]);

  if (isLoading)
    return (
      <div className={styles.padding}>
        <p>Loading...</p>
      </div>
    );

  if (errorMessage) {
    return <Typography color='red'>Error: {errorMessage}</Typography>;
  }

  if (rewards.length === 0)
    return (
      <div className={styles.padding}>
        <p>No reward data</p>
      </div>
    );

  return (
    <div className={styles.padding}>
      <h3>Rewards:</h3>
      <ul className={styles.list}>
        {rewards.map((repo, i) => (
          <li key={`repo_${repo.name}`}>
            <span>{repo.name}</span>
            <ul>
              {repo.issues.map((issue) => (
                <li key={`repo_${repo.name}_issue_${issue.id}`}>
                  <a href={issue.htmlurl}>Number: {issue.number}</a>{' '}
                  <span>{issue.contributors[0].rewardSum}</span>
                  <ClaimAndCollectReward
                    id={issue.id.toString(10)}
                  ></ClaimAndCollectReward>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
