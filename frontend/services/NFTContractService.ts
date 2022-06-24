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
  //TODO dynamically set rpc url
  const provider = new ethers.providers.JsonRpcProvider(
    'http://127.0.0.1:8545/'
  );
  // TODO load signer from metamask & load address from source of truth
  const airdrop = ZekoGenerativeNFT__factory.connect(
    '0x5FbDB2315678afecb367f032d93F642f64180aa3',
    provider
  );

  const balance = await airdrop.balanceOf(address);

  let NFTs: ZekoGenerativeNFT[] = [];
  for (let i = 0; i < balance.toNumber(); i++) {
    const tokenId = await airdrop.tokenOfOwnerByIndex(
      '0x9fe46736679d2d9a65f0992f2272de9f3c7fa6e0',
      i
    );
    const URI = await airdrop.tokenURI(tokenId);
    // 29 = length of "data:application/json;base64,"
    const json = atob(URI.substring(29));
    const nft = JSON.parse(json) as ZekoGenerativeNFT;
    NFTs.push(nft);
  }

  return NFTs;
};
