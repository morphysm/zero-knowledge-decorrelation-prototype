import { ethers } from "ethers";

let oprimisimKovanRpcUrl = process.env.NEXT_PUBLIC_OPTIMIS_KOVAN_RPC_URL;

export const getProvider = ():ethers.providers.JsonRpcProvider => {
    if (!window.ethereum) {
      throw new Error('could not connect to metamask');
    }

    // Check for Optimism Kovan
    if (window.ethereum.networkVersion === '69') {
      return new ethers.providers.JsonRpcProvider(oprimisimKovanRpcUrl);
    }

    return new ethers.providers.Web3Provider(window.ethereum);
};