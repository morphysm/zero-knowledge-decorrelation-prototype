import styles from './Navigation.module.css';
import isMobile from '../../../utils/IsMobile';
import { useContext } from 'react';
import { SessionContext } from '../../../context/SessionProvider';
import Button from '../../atoms/button/Button';

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
      {bearerToken !== '' && <Button text='Log Out' onClick={handleLogout} />}
    </div>
  );
};

export default Background;
