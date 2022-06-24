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
  // TODO replace with sign from metamask
  const signer = new ethers.Wallet(
    '0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d',
    provider
  );
  // TODO load signer from metamask & load address from source of truth
  const airdrop = PrivateAirdrop__factory.connect(
    '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
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
