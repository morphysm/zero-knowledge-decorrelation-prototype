/// <reference types="node" />
import { MerkleTree } from './MerkleTree';
export declare function generateProofCallData(merkleTree: MerkleTree, key: BigInt, secret: BigInt, rewardID: BigInt, receiverAddr: string, circuitWasmBuffer: Buffer, zkeyBuffer: Buffer): Promise<string>;
export declare function mimcSponge(l: BigInt, r: BigInt): Promise<BigInt>;
export declare function pedersenHash(nullifier: BigInt): Promise<BigInt>;
export declare function pedersenHashPreliminary(nullifier: BigInt, secret: BigInt): Promise<BigInt>;
export declare function pedersenHashFinal(preCommitment: BigInt, rewardID: BigInt): Promise<BigInt>;
export declare function toHex(number: BigInt, length?: number): string;
