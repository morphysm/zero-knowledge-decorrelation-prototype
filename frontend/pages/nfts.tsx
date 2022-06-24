import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

import { SessionContext } from '../context/SessionProvider';
import { MetamaskContext } from '../context/MetamaskProvider';

import { getNFTs, ZekoGenerativeNFT } from '../services/NFTContractService';

import styles from '../styles/Home.module.css';

const NFTs: NextPage = () => {
  const router = useRouter();
  const { bearerToken } = useContext(SessionContext);
  const { address } = useContext(MetamaskContext);

  const [isLoading, setLoading] = useState(false);
  const [nfts, setnfts] = useState<ZekoGenerativeNFT[]>([]);

  useEffect(() => {
    console.log('bearerToken', bearerToken);
    if (bearerToken === '') {
      router.push('/auth/login');
    }

    setLoading(true);
    getNFTs(address).then((nfts) => setnfts(nfts));
    console.log(nfts);
    setLoading(false);
  }, [bearerToken]);

  if (isLoading)
    return (
      <div className={styles.padding}>
        <p>Loading...</p>
      </div>
    );

  return (
    <div className={styles.padding}>
      <h3>NFTs:</h3>

      {nfts.map((nft, i) => {
        return (
          <li key={`NFT_${i}`}>
            <span>Dao: {nft.Dao}</span>
            <span>Role: {nft.Role}</span>
            <span>TokenIdInRoleCollection: {nft.TokenIdInRoleCollection}</span>
            <img src={nft.image} />
          </li>
        );
      })}
    </div>
  );
};

export default NFTs;
