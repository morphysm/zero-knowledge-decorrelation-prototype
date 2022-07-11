import { ethers, utils } from 'ethers';
// import detectEthereumProvider from '@metamask/detect-provider';
import { PrivateAirdrop__factory } from 'contracts/typechain';
import { getAirdropAddress } from './AddressService';

export const collectAirdrop = async (
  proof: string,
  nullifierHash: string,
  rewardID: string
) => {
  if (!window.ethereum) {
    throw new Error('could not connect to metamask');
  }

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
    utils.formatBytes32String(rewardID)
  );
  const receipt = await tx.wait();
  console.log(receipt);
};
