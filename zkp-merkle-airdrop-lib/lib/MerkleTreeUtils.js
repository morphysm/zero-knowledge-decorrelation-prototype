"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMerkleTreeFromCommitments = exports.getMerkleTreeFromPublicListOfCommitments = exports.addNewCommitment = void 0;
const crypto = require("crypto");
const fs_1 = require("fs");
const MerkleTree_1 = require("./MerkleTree");
const process_1 = require("process");
function randomBigInt(nBytes) {
    return toBigIntLE(crypto.randomBytes(nBytes));
}
function toBigIntLE(buff) {
    const reversed = Buffer.from(buff);
    reversed.reverse();
    const hex = reversed.toString('hex');
    if (hex.length === 0) {
        return BigInt(0);
    }
    return BigInt(`0x${hex}`);
}
async function addNewCommitment(filename, newcommitment, treeheight) {
    const input = (0, fs_1.readFileSync)(filename).toString();
    // replace and empty leaf with the newCommitment leaf
    const commitments = input.trim().split(',');
    const indexToReplace = commitments.indexOf('0x0000000000000000000000000000000000000000000000000000000000000000');
    commitments[indexToReplace] = newcommitment;
    if (commitments.length > 2 ** treeheight) {
        console.error(`Too many commitments for tree height. Maximum is ${2 ** treeheight}`);
        (0, process_1.exit)(-1);
    }
    else if (commitments.length != 2 ** treeheight) {
        console.log(`Number of commitments provided (${commitments.length}) is not equal to total tree width (${2 ** treeheight}), will fill in remainder with random commitments.`);
    }
    const commitmentsBigInt = commitments.map((commitment) => BigInt(commitment));
    for (let i = commitments.length; i < 2 ** treeheight; i++) {
        commitmentsBigInt.push(randomBigInt(31));
    }
    // UPDATE THE Commitment Public FILE
    const newCommitments = commitments.toString();
    (0, fs_1.writeFileSync)(filename, newCommitments);
    console.log('list of public commitments succesfully updated');
    // Generate the merkle tree and return it
    return await MerkleTree_1.MerkleTree.createFromLeaves(commitmentsBigInt);
}
exports.addNewCommitment = addNewCommitment;
async function getMerkleTreeFromPublicListOfCommitments(filename, treeheight) {
    const input = (0, fs_1.readFileSync)(filename).toString();
    // replace and empty leaf with the newCommitment leaf
    const commitments = input.trim().split(',');
    if (commitments.length > 2 ** treeheight) {
        console.error(`Too many commitments for tree height. Maximum is ${2 ** treeheight}`);
        (0, process_1.exit)(-1);
    }
    else if (commitments.length != 2 ** treeheight) {
        console.log(`Number of commitments provided (${commitments.length}) is not equal to total tree width (${2 ** treeheight}), will fill in remainder with random commitments.`);
    }
    const commitmentsBigInt = commitments.map((commitment) => BigInt(commitment));
    for (let i = commitments.length; i < 2 ** treeheight; i++) {
        commitmentsBigInt.push(randomBigInt(31));
    }
    // Generate the merkle tree and return it
    return await MerkleTree_1.MerkleTree.createFromLeaves(commitmentsBigInt);
}
exports.getMerkleTreeFromPublicListOfCommitments = getMerkleTreeFromPublicListOfCommitments;
async function getMerkleTreeFromCommitments(commitments, treeheight) {
    if (commitments.length > 2 ** treeheight) {
        console.error(`Too many commitments for tree height. Maximum is ${2 ** treeheight}`);
        Promise.reject();
    }
    else if (commitments.length != 2 ** treeheight) {
        console.log(`Number of commitments provided (${commitments.length}) is not equal to total tree width (${2 ** treeheight}), will fill in remainder with random commitments.`);
    }
    const commitmentsBigInt = commitments.map((commitment) => BigInt(commitment));
    for (let i = commitments.length; i < 2 ** treeheight; i++) {
        commitmentsBigInt.push(randomBigInt(31));
    }
    // Generate the merkle tree and return it
    return await MerkleTree_1.MerkleTree.createFromLeaves(commitmentsBigInt);
}
exports.getMerkleTreeFromCommitments = getMerkleTreeFromCommitments;
