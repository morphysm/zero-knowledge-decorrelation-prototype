import { writeFileSync } from "fs";
import addressFile from "../deployments/addresses.json";

type NetworkName = "local" | "goerli" | "optimismKovan";

export function isOfTypeNetworkName(
  networkName: string
): networkName is NetworkName {
  return ["goerli", "local", "optimismKovan"].includes(networkName);
}
interface Addresses {
  nft: string;
  plonkVerifier: string;
  privateAidrop: string;
}

export function getContractAddresses(networkName: NetworkName): Addresses {
  return addressFile[networkName];
}

export function putContractAddresses(
  nft: string,
  plonkVerifier: string,
  privateAidrop: string,
  networkName: NetworkName
) {
  addressFile[networkName].nft = nft;
  addressFile[networkName].plonkVerifier = plonkVerifier;
  addressFile[networkName].privateAidrop = privateAidrop;
  writeFileSync(
    "./deployments/addresses.json",
    JSON.stringify(addressFile, null, 2)
  );
}
