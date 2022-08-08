import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';

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
            <Stack direction='column' gap={2}>
            <Link href={repo.htmlurl}>{`${repo.owner}/${repo.name}`}</Link>
              <ul>
              <Stack direction='column' gap={2}>
                {repo.issues.map((issue) => (
                  <li key={`repo_${repo.name}_issue_${issue.id}`}>
                    <Stack direction='column' gap={2}>
                      <Stack direction='row' gap={2}>
                        <Link href={issue.htmlurl}>Issue number: {issue.number}</Link>
                        <Link href={issue.contributors[0].htmlUrl}>Contributor: {issue.contributors[0].login}</Link>
                        <span>Points: {(Math.round(issue.contributors[0].rewardSum * 100) / 100).toFixed(2)}</span>
                      </Stack>
                      <ApproveReward id={issue.id.toString(10)}></ApproveReward>
                    </Stack>
                  </li>
                ))}
                </Stack>
              </ul>
            </Stack>
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
  if (!address) {
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
