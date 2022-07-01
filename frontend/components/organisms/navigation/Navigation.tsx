import styles from './Navigation.module.css';
import { useContext, useEffect, useState } from 'react';
import { SessionContext } from '../../../context/SessionProvider';
import { MetamaskContext } from '../../../context/MetamaskProvider';

import Button from '../../atoms/button/Button';
import MetamaskConnect from '../../molecule/metamaskConnect/MetamaskConnect';
import router from 'next/router';

interface BackgroundProps {
  user?: User;
}

const Background: React.FC<BackgroundProps> = () => {
  const { user, bearerToken, setBearerToken } = useContext(SessionContext);
  const { address } = useContext(MetamaskContext);

  const handleLogoutClick = async () => {
    setBearerToken('');
  };

  const handleNFTsClick = async () => {
    router.push('/nfts');
  };

  const handleHomeClick = async () => {
    router.push('/');
  };

  const handleApproveClick = async () => {
    router.push('/approve');
  };

  return (
    <div className={styles.navigation}>
      {user && (
        <div className={styles.user}>
          <img src={user.avatar_url}></img>
          <span>{user.login}</span>
        </div>
      )}
      {bearerToken !== '' && (
        <>
          <MetamaskConnect />
          {address !== '' && router.pathname !== '/nfts' && (
            <Button onClick={handleNFTsClick}>See NFTs</Button>
          )}
          {router.pathname !== '/approve' && (
            <Button onClick={handleApproveClick}>Approve</Button>
          )}
          {router.pathname !== '/' && (
            <Button onClick={handleHomeClick}>Home</Button>
          )}

          <Button onClick={handleLogoutClick}>Log Out</Button>
        </>
      )}
    </div>
  );
};

export default Background;
