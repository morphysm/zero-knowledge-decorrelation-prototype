import { writeFileSync } from "fs";
import addressFile from "../deployments/addresses.json";

interface Addresses {
  nft: string;
  plonkVerifier: string;
  privateAidrop: string;
}

export function getContractAddresses(): Addresses {
  return addressFile.local;
}

export function putContractAddresses(
  nft: string,
  plonkVerifier: string,
  privateAidrop: string
) {
  addressFile.local.nft = nft;
  addressFile.local.plonkVerifier = plonkVerifier;
  addressFile.local.privateAidrop = privateAidrop;
  writeFileSync(
    "./deployments/addresses.json",
    JSON.stringify(addressFile, null, 2)
  );
}
