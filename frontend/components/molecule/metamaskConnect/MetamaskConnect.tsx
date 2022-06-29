import { Button, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { MetamaskContext } from '../../../context/MetamaskProvider';

const MetamaskConnect = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { address, setAddress } = useContext(MetamaskContext);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', accountsChanged);
      window.ethereum.on('chainChanged', chainChanged);
    }
  }, []);

  const connectHandler = async () => {
    if (window.ethereum) {
      try {
        const res = await window.ethereum.request<string[]>({
          method: 'eth_requestAccounts',
        });
        if (res && res[0]) {
          setAddress(res[0]);
        }
      } catch (err) {
        console.error(err);
        setErrorMessage('There was a problem connecting to MetaMask');
      }
    } else {
      setErrorMessage('Install MetaMask');
    }
  };

  const accountsChanged = (...args: unknown[]) => {
    if (args && args[0] && typeof (args[0] as string[])[0] === 'string') {
      setAddress(args[0] as string[][0]);
    }
  };

  const chainChanged = () => {
    setErrorMessage(null);
    setAddress('');
  };

  return (
    <>
      {address ? (
        <span>Account: {address}</span>
      ) : (
        <Button onClick={connectHandler}>Connect Metamask</Button>
      )}
      {errorMessage ? (
        <Typography variant='body1' color='red'>
          Error: {errorMessage}
        </Typography>
      ) : null}
    </>
  );
};

export default MetamaskConnect;
