import { ethers, utils } from 'ethers';
// import detectEthereumProvider from '@metamask/detect-provider';
import { PrivateAirdrop__factory } from '../typechain';
import { getAirdropAddress } from './AddressService';
import { toHex } from 'zkp-merkle-airdrop-lib';

export const collectAirdrop = async (
  proof: string,
  nullifierHash: string,
  rewardID: string
) => {
  if (!window.ethereum) {
    throw new Error('could not connect to metamask');
  }
  console.log(toHex(BigInt(rewardID)))

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  // TODO load address from source of truth
  const airdrop = PrivateAirdrop__factory.connect(
    await getAirdropAddress(provider),
    signer
  );

  const tx = await airdrop.collectAirdrop(
    proof,
    nullifierHash,
    toHex(BigInt(rewardID))
  );
  const receipt = await tx.wait();
  console.log(receipt);
};
