import React, { useContext, useEffect, useState } from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { SessionContext } from './../../../context/SessionProvider';
import styles from '../../../styles/Home.module.css';
import LoadingButton from './../../../components/atoms/loadingButton/LoadingButton';
import { toHex } from 'zkp-merkle-airdrop-lib';
import { generateProof, hashNullifier } from '../../../utils/GenerateProof';
import { MetamaskContext } from '../../../context/MetamaskProvider';
import { collectAirdrop } from '../../../services/AirdropContractService';

const CollectPage: NextPage = () => {
  const router = useRouter();
  const { rewardId } = router.query;
  const { session } = useContext(SessionContext);
  const { address } = useContext(MetamaskContext);

  const [nullifier, setNullifier] = useState(
    '0x00202a03cea47b7918a36f12e6522c88f8fbcc9f74e07d529e9ce8f3a113ea87'
  );
  const [secret, setSecret] = useState(
    '0x00c46daf8a91c6b69e260765036de0ccf4b2e1cfe063ca630a6611f13adadee0'
  );
  const [loadingCollect, setLoadingCollect] = useState<boolean>(false);

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

  const handleCollectClick = async (rewardId: string) => {
    setLoadingCollect(true);
    try {
      // TODO remove conversion to BigInt
      const proof = await generateProof(
        address,
        nullifier,
        secret,
        toHex(BigInt(rewardId))
      );
      console.log(proof);
      const nullifierHash = await hashNullifier(nullifier);
      await collectAirdrop(proof, nullifierHash, rewardId);
    } catch (err) {
      console.log(err);
    }
    setLoadingCollect(false);
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
      </form>
      {address !== '' && (
        <LoadingButton
          loading={loadingCollect}
          onClick={() => handleCollectClick(rewardId as string)}
        >
          Collect
        </LoadingButton>
      )}
      {address === '' && <span>Connect Metamask</span>}
    </div>
  );
};

export default CollectPage;
