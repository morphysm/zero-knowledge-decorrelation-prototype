import { PrivateAirdrop__factory } from '../typechain';
import { getAirdropAddress } from './AddressService';
import { getProvider } from './ProviderService';
import { toHex } from 'zkp-merkle-airdrop-lib';

export const collectAirdrop = async (
  proof: string,
  nullifierHash: string,
  rewardID: string
) => {
  const {provider, signer} = getProvider()
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
