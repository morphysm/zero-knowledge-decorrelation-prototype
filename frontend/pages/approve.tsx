import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

import Alert from '@mui/material/Alert';

import { getRewardsByRepo } from '../services/AirdropService';
import {
  getValue,
  getOwner,
  postApproval,
} from '../services/ApproveContractService';

import { SessionContext } from '../context/SessionProvider';
import Button from '../components/atoms/button/Button';

import styles from '../styles/Home.module.css';
import { MetamaskContext } from '../context/MetamaskProvider';

interface Approved {
  approved: boolean;
  value?: string;
}

type RewardApproved = Reward & Approved;

interface Repo {
  name: string;
  rewards: RewardApproved[];
}

const Home: NextPage = () => {
  const router = useRouter();

  const { bearerToken } = useContext(SessionContext);
  const { address } = useContext(MetamaskContext);

  const [isLoading, setLoading] = useState(true);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [owner, setOwner] = useState<string>('');

  useEffect(() => {
    if (bearerToken === '') {
      router.push('/auth/login');
    }

    setLoading(true);

    loadData(bearerToken).then(() => {
      setLoading(false);
    });
  }, [bearerToken]);

  const loadData = async (bearerToken: string): Promise<void> => {
    await Promise.all([loadRewardsApproved(bearerToken), loadOwner()]);
  };

  const loadRewardsApproved = async (bearerToken: string): Promise<void> => {
    const rewardsResponse = await getRewardsByRepo(bearerToken);

    // Load approval for all rewards from approval smart contract
    let rewardsApproved = await Promise.all(
      rewardsResponse.repos.map(async (repo) => {
        const rewardsApproved = await Promise.all(
          repo.rewards.map(async (reward): Promise<RewardApproved> => {
            const approved = await getValue(reward.id);
            return { ...reward, ...approved };
          })
        );
        return { name: repo.name, rewards: rewardsApproved };
      })
    );

    setRepos(rewardsApproved);
  };

  const loadOwner = async (): Promise<void> => {
    const owner = await getOwner();
    setOwner(owner);
  };

  if (isLoading) {
    return (
      <div className={styles.padding}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className={styles.padding}>
      <Warning address={address} owner={owner} />
      <h3>Rewards:</h3>
      <ul className={styles.list}>
        {repos.map((repo, i) => (
          <li key={`reward_${i}`}>
            <h4>{repo.name}</h4>
            <ul>
              {repo.rewards.map((reward) => (
                <li>
                  <span>{reward.id}</span> <span>{reward.value}</span>{' '}
                  <span>{reward.date}</span> <span>{reward.url}</span>{' '}
                  {reward.approved ? (
                    <span>Approved</span>
                  ) : (
                    address.toLowerCase() === owner.toLowerCase() && (
                      <span>
                        {' '}
                        <ApproveButton
                          rewardId={reward.id}
                          reward={reward.value}
                        />
                      </span>
                    )
                  )}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

interface WarningProps {
  address: string;
  owner: string;
}

const Warning: React.FC<WarningProps> = ({ address, owner }) => {
  if (address === '') {
    return (
      <Alert severity='warning'>
        You can not approve the rewards! Connect your wallet.
      </Alert>
    );
  }

  if (owner.toLowerCase() !== address.toLowerCase()) {
    return (
      <Alert severity='warning'>
        You can not approve the rewards! Your connected address {address} is not
        the owner {owner} of the approval conntract.
      </Alert>
    );
  }

  return <></>;
};

interface ApproveButtonProps {
  rewardId: string;
  reward: string;
}

const ApproveButton: React.FC<ApproveButtonProps> = ({ rewardId, reward }) => {
  const handleApproveClick = (rewardId: string) => {
    postApproval(rewardId, reward);
  };

  return <Button onClick={() => handleApproveClick(rewardId)}>Approve</Button>;
};

export default Home;
