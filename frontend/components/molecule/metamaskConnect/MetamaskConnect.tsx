import React, { useContext, useEffect, useState } from 'react';
import { Button, Typography, Box } from '@mui/material';
import { ExternalProvider } from '@ethersproject/providers';
import { MetaMaskInpageProvider } from '@metamask/providers';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';

import { MetamaskContext } from '../../../context/MetamaskProvider';

const MetamaskConnect: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { address, setAddress } = useContext(MetamaskContext);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', accountsChanged);
      window.ethereum.on('chainChanged', chainChanged);
      reqestAccounts(window.ethereum);
    }
  }, [window.ethereum]);

  const connectHandler = async () => {
    if (window.ethereum) {
      await reqestAccounts(window.ethereum);
    } else {
      setErrorMessage('Install MetaMask');
    }
  };

  const accountsChanged = (...args: unknown[]) => {
    if (args && args[0] && typeof (args[0] as string[])[0] === 'string') {
      const addresses = args[0] as string[][0]
      setAddress(addresses[0]);
    }
  };

  const chainChanged = () => {
    setErrorMessage(null);
    setAddress('');
  };

  const reqestAccounts = async (
    ethereum: ExternalProvider & MetaMaskInpageProvider
  ) => {
    try {
      const res = await ethereum.request<string[]>({
        method: 'eth_requestAccounts',
      });
      if (res && res[0]) {
        setAddress(res[0]);
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('There was a problem connecting to MetaMask');
    }
  };

  return (
    <>
      {address ? (
      <Box display='flex' justifyContent='center' gap={1}>
        <Jazzicon diameter={20} seed={jsNumberForAddress(address)} />
        <span>Account: {`${address.substring(0, 5)}...${address.substring(address.length - 4)}`}</span>
      </Box>
      ) : (
        <Button onClick={connectHandler}>Connect Metamask</Button>
      )}
      {errorMessage ? (
        <Typography color='red'>Error: {errorMessage}</Typography>
      ) : null}
    </>
  );
};

export default MetamaskConnect;
