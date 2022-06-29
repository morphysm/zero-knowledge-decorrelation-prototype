import { ethers } from 'ethers';
// import detectEthereumProvider from '@metamask/detect-provider';
import { PrivateAirdrop__factory } from 'contracts/typechain';
import { toHex } from 'zkp-merkle-airdrop-lib';

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
    '0x7EfE41334ef01319CABe340669A028516cD2f9b0',
    signer
  );

  //TODO imporve toHex
  const tx = await airdrop.collectAirdrop(
    proof,
    nullifierHash,
    toHex(BigInt(rewardID))
  );
  const receipt = await tx.wait();
  console.log(receipt);
};
