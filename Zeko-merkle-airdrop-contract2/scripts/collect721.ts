// Collect against locally created merkle tree (only the first 4 commitments)
const hre = require("hardhat");
import { readFileSync } from "fs";
import { readMerkleTreeAndSourceFromFile } from "../utils/TestUtils";
import { generateProofCallData, pedersenHash, toHex } from "zkp-merkle-airdrop-lib";

/** Collect an airdrop from the local merkle tree against deployed contract. */
async function main() {
    let WASM_PATH = "./build/circuit_js/circuit.wasm";
    let ZKEY_PATH = "./build/circuit_final.zkey";

    let WASM_BUFF = readFileSync(WASM_PATH);
    let ZKEY_BUFF = readFileSync(ZKEY_PATH);

    let ERC721_ADDR = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    let AIRDROP_ADDR = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
    let MT_KEYS_PATH = "./test/temp/mt_keys_32.txt"

    let [collector] = await hre.ethers.getSigners();

    let merkleTreeAndSource = readMerkleTreeAndSourceFromFile(MT_KEYS_PATH);
    let redeemIndex = 2;
    let key = merkleTreeAndSource.leafNullifiers[redeemIndex];
    let secret = merkleTreeAndSource.leafSecrets[redeemIndex];
    let proof = 
        await generateProofCallData(
            merkleTreeAndSource.merkleTree, 
            key, 
            secret, 
            collector.address,
            WASM_BUFF,
            ZKEY_BUFF);
    console.log("Proof: ", proof);

    let keyHash = toHex(pedersenHash(key));
   
    let airdropContract =  await hre.ethers.getContractAt("PrivateAirdrop", AIRDROP_ADDR)

    // I'm aidropping you NFT ID = 1; to be modified in the future from PrivateAirdropERC721 contract
    let tx = await airdropContract.collectAirdrop(proof, keyHash);
    await tx.wait();
    console.log("Collected!")

    let zekoNFT =  await hre.ethers.getContractAt("ZekoNFT", ERC721_ADDR)
    let balance = await zekoNFT.balanceOf(collector.address)
    console.log(`Collector balance: ${balance.toString()}`)
}

main().then(() => process.exit(0))
    .catch(e => {
        console.error(e);
        process.exit(-1);
    })