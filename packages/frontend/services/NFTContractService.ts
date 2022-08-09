
import { ZekoGenerativeNFT__factory } from '../typechain';
import { getNFTAddress } from './AddressService';
import { getProvider } from './ProviderService';

export interface ZekoGenerativeNFT {
  Dao: string;
  Role: string;
  TokenIdInRoleCollection: string;
  image: string;
  attributes: Attributes[];
}

interface Attributes {
  trait_type: string;
  value: string;
}

export const getNFTs = async (
  address: string
): Promise<ZekoGenerativeNFT[]> => {
  const {provider, signer} = getProvider()

  // TODO load address from source of truth
  const airdrop = ZekoGenerativeNFT__factory.connect(
    await getNFTAddress(provider),
    signer
  );

  const balance = await airdrop.balanceOf(address);

  let NFTs: ZekoGenerativeNFT[] = [];
  for (let i = 0; i < balance.toNumber(); i++) {
    //TODO replace by metamask address
    const tokenId = await airdrop.tokenOfOwnerByIndex(address, i);
    const URI = await airdrop.tokenURI(tokenId);
    // 29 = length of "data:application/json;base64,"
    const json = window.atob(URI.substring(29));
    console.log(json);
    const nft = JSON.parse(json) as ZekoGenerativeNFT;
    NFTs.push(nft);
  }

  return NFTs;
};
