import React from 'react';
import styles from './Button.module.css';

type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
};

const Button: React.FC<ButtonProps> = ({ children, onClick }: ButtonProps) => {
  return (
    <div className={styles.button}>
      <button type='button' onClick={onClick}>
        {children}
      </button>
    </div>
  );
};

export default Button;
