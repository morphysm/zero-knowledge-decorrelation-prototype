import { ethers } from "ethers";

let oprimisimKovanRpcUrl = process.env.NEXT_PUBLIC_OPTIMIS_KOVAN_RPC_URL;

export const getProvider = ():{provider: ethers.providers.JsonRpcProvider, signer: ethers.providers.JsonRpcSigner} => {
    if (!window.ethereum) {
      throw new Error('could not connect to metamask');
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner()

    // Check for Optimism Kovan
    if (window.ethereum.networkVersion === '69') {
      return {provider: new ethers.providers.JsonRpcProvider(oprimisimKovanRpcUrl), signer}
    }

    return {provider, signer: provider.getSigner()}
};