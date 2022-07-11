import React, { useContext, useEffect } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import { SessionContext } from '../../context/SessionProvider';
import styles from '../../styles/Home.module.css';
import GitHubLogin from '../../components/molecule/gitHubLogin/GitHubLogin';

const LoginPage: NextPage = () => {
  const router = useRouter();
  const { session } = useContext(SessionContext);

  useEffect(() => {
    if (session !== null) {
      router.push('/');
    }
  }, [session]);

  return (
    <div className={styles.padding}>
      <h1>Famed Airdrop Prototype</h1>
      <h3>Claim and Collect Famed Rewards</h3>
      <GitHubLogin />
    </div>
  );
};

export default LoginPage;
