import {
  getContractAddresses,
  NetworkName,
} from 'contracts/utils/AddressStore';
import { ethers } from 'ethers';

export const getNFTAddress = async (
  provider: ethers.providers.Web3Provider
): Promise<string> => {
  const parsedNetwork = await parseNetwork(provider);
  return getContractAddresses(parsedNetwork).nft;
};

export const getApproveAddress = async (
  provider: ethers.providers.Web3Provider
): Promise<string> => {
  const parsedNetwork = await parseNetwork(provider);
  return getContractAddresses(parsedNetwork).approve;
};

export const getAirdropAddress = async (
  provider: ethers.providers.Web3Provider
): Promise<string> => {
  const parsedNetwork = await parseNetwork(provider);
  return getContractAddresses(parsedNetwork).privateAidrop;
};

const parseNetwork = async (
  provider: ethers.providers.Web3Provider
): Promise<NetworkName> => {
  const network = await provider._networkPromise;
  let networkName = network.name;
  // TODO remove in production
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
