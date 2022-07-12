import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';

import { getRewardsByOwner } from '../services/AirdropService';
import { getOwner } from '../services/ApproveContractService';

import { SessionContext } from '../context/SessionProvider';

import styles from '../styles/Home.module.css';
import { MetamaskContext } from '../context/MetamaskProvider';
import ApproveReward from '../components/molecule/reward/ApproveReward';

const Approve: NextPage = () => {
  const router = useRouter();

  const { session } = useContext(SessionContext);
  const { address } = useContext(MetamaskContext);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [isLoading, setLoading] = useState(true);
  const [rewards, setRewards] = useState<Repo[]>([]);
  const [owner, setOwner] = useState<string>('');

  useEffect(() => {
    if (
      session === null ||
      session.provider_token === null ||
      session.provider_token === undefined
    ) {
      router.push('/auth/login');
      return;
    }

    setLoading(true);
    loadOwner();
    getRewardsByOwner(session.provider_token).then((data) => {
      console.log(data);
      setRewards(data.repos);
      setLoading(false);
    });
  }, [session]);

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

  if (errorMessage) {
    return <Typography color='red'>Error: {errorMessage}</Typography>;
  }

  return (
    <div className={styles.padding}>
      <Warning address={address} owner={owner} />
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
                  <ApproveReward id={issue.id.toString(10)}></ApproveReward>
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

export default Approve;
