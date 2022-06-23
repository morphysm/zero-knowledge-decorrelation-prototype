import { ethers } from 'ethers';
import { PrivateAirdrop__factory } from 'contracts/typechain';
import { toHex } from 'zkp-merkle-airdrop-lib';

export const collectAirdrop = async (
  proof: string,
  nullifierHash: string,
  rewardID: string
) => {
  //TODO dynamically set rpc url
  const provider = new ethers.providers.JsonRpcProvider(
    'http://127.0.0.1:8545/'
  );
  const signer = new ethers.Wallet(
    '0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d',
    provider
  );
  // TODO load signer from metamask & load address from source of truth
  const airdrop = PrivateAirdrop__factory.connect(
    '0x2279b7a0a67db372996a5fab50d91eaa73d2ebe6',
    signer
  );

  //TODO set right gas limit
  //TODO im porve toHex
  const tx = await airdrop.collectAirdrop(
    proof,
    nullifierHash,
    toHex(BigInt(rewardID))
  );
  const receipt = await tx.wait();
  console.log(receipt);
};
