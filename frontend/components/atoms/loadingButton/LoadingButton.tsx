import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import styles from './LoadingButton.module.css';
import Button from '../button/Button';

type LoadingButtonProps = {
  children: React.ReactNode;
  loading: boolean;
  onClick: () => void;
};

const LoadingButton: React.FC<LoadingButtonProps> = ({
  children,
  loading,
  onClick,
}: LoadingButtonProps) => {
  return (
    <Button onClick={onClick}>
      {loading && (
        <div className={styles.loadingContainer}>
          <CircularProgress size={15} />
        </div>
      )}
      {children}
    </Button>
  );
};

export default LoadingButton;
