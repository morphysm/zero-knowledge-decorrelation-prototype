import React, { useContext, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { SessionContext } from './../../../context/SessionProvider';
import styles from '../../../styles/Home.module.css';
import LoadingButton from './../../../components/atoms/loadingButton/LoadingButton';
import { pedersenHashPreliminary, toHex } from 'zkp-merkle-airdrop-lib';
import { postPreCommitment } from './../../../services/AirdropService';
import Alert from '@mui/material/Alert';

const ClaimPage: NextPage = () => {
  const router = useRouter();
  const { rewardId } = router.query;
  const { session } = useContext(SessionContext);

  const [nullifier, setNullifier] = useState(
    '0x00202a03cea47b7918a36f12e6522c88f8fbcc9f74e07d529e9ce8f3a113ea87'
  );
  const [secret, setSecret] = useState(
    '0x00c46daf8a91c6b69e260765036de0ccf4b2e1cfe063ca630a6611f13adadee0'
  );
  const [preCommitment, setPreCommitment] = useState('');

  const [loadingGeneration, setLoadingGeneration] = useState<boolean>(false);
  const [loadingClaim, setLoadingClaim] = useState<boolean>(false);

  useEffect(() => {
    if (
      session === null ||
      session.provider_token === null ||
      session.provider_token === undefined
    ) {
      router.push('/auth/login');
      return;
    }
    if (!rewardId || rewardId === '' || typeof rewardId !== 'string') {
      router.push('/');
    }
  }, [rewardId, session]);

  const handleClickGeneratePreCommitment = async () => {
    setLoadingGeneration(true);
    try {
      const preCommitment = await pedersenHashPreliminary(
        BigInt(nullifier),
        BigInt(secret)
      );
      setPreCommitment(toHex(preCommitment));
    } catch (err) {
      console.log(err);
    }
    setLoadingGeneration(false);
  };

  const handleClaimClick = async () => {
    if (
      session === null ||
      session.provider_token === null ||
      session.provider_token === undefined
    ) {
      router.push('/auth/login');
      return;
    }

    setLoadingClaim(true);
    try {
      // TODO add nonce to protect against replay attacks
      await postPreCommitment(session.provider_token, rewardId as string, preCommitment);
    } catch (err) {
      console.log(err);
    }
    setLoadingClaim(false);
    router.push('/');
  };

  return (
    <div className={styles.padding}>
      <form className={styles.form}>
        <label htmlFor='nullifier'>Nullifier</label>
        <input
          type='text'
          id='nullifier'
          name='nullifier'
          value={nullifier}
          onChange={(e) => setNullifier(e.target.value)}
        />
        <label htmlFor='secret'>Secret</label>
        <input
          type='text'
          id='secret'
          name='secret'
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
        />
        <label htmlFor='secret'>Precommitment</label>
        <input
          type='text'
          id='preCommitment'
          name='preCommitment'
          value={preCommitment}
          onChange={(e) => setPreCommitment(e.target.value)}
        />
      </form>
      {preCommitment === '' ? (
        <LoadingButton
          loading={loadingGeneration}
          onClick={handleClickGeneratePreCommitment}
        >
          Generate Precommitment
        </LoadingButton>
      ) : (
        <LoadingButton loading={loadingClaim} onClick={handleClaimClick}>
          Claim Reward {rewardId}
        </LoadingButton>
      )}
    </div>
  );
};

export default ClaimPage;
