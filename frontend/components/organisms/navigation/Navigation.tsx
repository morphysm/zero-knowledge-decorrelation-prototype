import styles from './Navigation.module.css';
import { useContext } from 'react';
import { SessionContext } from '../../../context/SessionProvider';
import Button from '../../atoms/button/Button';
import MetamaskConnect from '../../molecule/metamaskConnect/MetamaskConnect';

interface BackgroundProps {
  user?: User;
}

const Background: React.FC<BackgroundProps> = () => {
  const { user, bearerToken, setBearerToken } = useContext(SessionContext);

  const handleLogout = async () => {
    setBearerToken('');
  };

  return (
    <div className={styles.navigation}>
      {user && (
        <div className={styles.user}>
          <img src={user.avatar_url}></img>
          <span>{user.login}</span>
        </div>
      )}
      <MetamaskConnect />
      {bearerToken !== '' && <Button onClick={handleLogout}>Log Out</Button>}
    </div>
  );
};

export default Background;
