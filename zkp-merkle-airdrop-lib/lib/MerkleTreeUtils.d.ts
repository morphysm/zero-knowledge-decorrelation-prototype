import { MerkleTree } from './MerkleTree';
export declare function addNewCommitment(filename: string, newcommitment: string, treeheight: number): Promise<MerkleTree>;
export declare function getMerkleTreeFromPublicListOfCommitments(filename: string, treeheight: number): Promise<MerkleTree>;
export declare function getMerkleTreeFromCommitments(commitments: string[], treeheight: number): Promise<MerkleTree>;
