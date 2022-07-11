import { writeFileSync } from "fs";
import addressFile from "../deployments.json";

export type NetworkName = "localhost" | "goerli" | "optimismKovan";

export function isOfTypeNetworkName(networkName: string): networkName is NetworkName {
  return ["goerli", "localhost", "optimismKovan"].includes(networkName);
}
interface Addresses {
  nft: string;
  plonkVerifier: string;
  privateAidrop: string;
  approve: string;
}

export function getContractAddresses(networkName: NetworkName): Addresses {
  return addressFile[networkName];
}

export function putContractAddresses(
  nft: string,
  plonkVerifier: string,
  privateAidrop: string,
  approve: string,
  networkName: NetworkName
) {
  addressFile[networkName].nft = nft;
  addressFile[networkName].plonkVerifier = plonkVerifier;
  addressFile[networkName].approve = approve;
  addressFile[networkName].privateAidrop = privateAidrop;
  writeFileSync("./deployments.json", JSON.stringify(addressFile, null, 2));
}
