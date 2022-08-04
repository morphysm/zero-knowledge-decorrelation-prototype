import styles from './Navigation.module.css';
import { useContext } from 'react';
import { SessionContext } from '../../../context/SessionProvider';
import { MetamaskContext } from '../../../context/MetamaskProvider';

import Button from '../../atoms/button/Button';
import MetamaskConnect from '../../molecule/metamaskConnect/MetamaskConnect';
import router from 'next/router';

const Navigation: React.FC = () => {
  const { session, user, logOut } = useContext(SessionContext);
  const { address } = useContext(MetamaskContext);

  const handleLogoutClick = async () => {
    await logOut();
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
      {session !== null && (
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

export default Navigation;
