import {
  getContractAddresses,
  NetworkName,
} from '@famed-airdrop-prototype/contracts/utils/AddressStore';
import { ethers } from 'ethers';

let oprimisimKovanRpcUrl = process.env.NEXT_PUBLIC_OPTIMIS_KOVAN_RPC_URL;

export const getNFTAddress = async (
  provider: ethers.providers.JsonRpcProvider
): Promise<string> => {
  const parsedNetwork = await parseNetwork(provider);
  return getContractAddresses(parsedNetwork).nft;
};

export const getApproveAddress = async (
  provider: ethers.providers.JsonRpcProvider
): Promise<string> => {
  const parsedNetwork = await parseNetwork(provider);
  return getContractAddresses(parsedNetwork).approve;
};

export const getAirdropAddress = async (
  provider: ethers.providers.JsonRpcProvider
): Promise<string> => {
  const parsedNetwork = await parseNetwork(provider);
  return getContractAddresses(parsedNetwork).privateAidrop;
};

const parseNetwork = async (
  provider: ethers.providers.JsonRpcProvider
): Promise<NetworkName> => {
  const network = await provider._networkPromise;
  let networkName = network.name;
  if (networkName === 'unknown') networkName = 'localhost';
  if (networkName === 'optimism-kovan') networkName = 'optimismKovan';
  if (
    networkName !== 'localhost' &&
    networkName !== 'optimismKovan' &&
    networkName !== 'goerli'
  ) {
    throw new Error('unknown network');
  }

  return networkName;
};