/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type {
  IApprovedRewards,
  IApprovedRewardsInterface,
} from "../IApprovedRewards";

const _abi = [
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "rewardId",
        type: "bytes32",
      },
    ],
    name: "rewards",
    outputs: [
      {
        components: [
          {
            internalType: "bool",
            name: "approved",
            type: "bool",
          },
          {
            internalType: "enum IApprovedRewards.RewardType",
            name: "rewardType",
            type: "uint8",
          },
          {
            internalType: "uint256",
            name: "value",
            type: "uint256",
          },
        ],
        internalType: "struct IApprovedRewards.Reward",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export class IApprovedRewards__factory {
  static readonly abi = _abi;
  static createInterface(): IApprovedRewardsInterface {
    return new utils.Interface(_abi) as IApprovedRewardsInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): IApprovedRewards {
    return new Contract(address, _abi, signerOrProvider) as IApprovedRewards;
  }
}
