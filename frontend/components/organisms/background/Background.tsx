import styles from './Background.module.css';
import isMobile from '../../../utils/IsMobile';

const Background: React.FC = () => {
  return (
    <div className={styles.background}>
      {isMobile() ? (
        <div>
          <div className={styles.mobileCircle2}></div>
          <div className={styles.mobileCircle3}></div>
          <div className={styles.mobileCircle4}></div>
          <div className={styles.mobileCircle1}></div>
          <div className={styles.mobileCircle5}></div>
          <div className={styles.mobileCircle6}></div>
        </div>
      ) : (
        <div>
          <div className={styles.desktopCircle1}></div>
          <div className={styles.desktopCircle2}></div>
          <div className={styles.desktopCircle3}></div>
          <div className={styles.desktopCircle4}></div>
        </div>
      )}
    </div>
  );
};

export default Background;
