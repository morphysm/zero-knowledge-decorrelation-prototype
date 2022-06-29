import { ethers } from 'ethers';
import { ZekoGenerativeNFT__factory } from 'contracts/typechain';

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
  if (!window.ethereum) {
    throw new Error('could not connect to metamask');
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  // TODO load address from source of truth
  const airdrop = ZekoGenerativeNFT__factory.connect(
    '0x60492b0755D8dba01dB9915a1f8Bf28D242BF6dC',
    provider
  );

  const balance = await airdrop.balanceOf(address);

  let NFTs: ZekoGenerativeNFT[] = [];
  for (let i = 0; i < balance.toNumber(); i++) {
    //TODO replace by metamask address
    const tokenId = await airdrop.tokenOfOwnerByIndex(address, i);
    const URI = await airdrop.tokenURI(tokenId);
    // 29 = length of "data:application/json;base64,"
    const json = window.atob(URI.substring(29));
    const nft = JSON.parse(json) as ZekoGenerativeNFT;
    NFTs.push(nft);
  }

  return NFTs;
};
