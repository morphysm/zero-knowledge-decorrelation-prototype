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

    let ERC721_ADDR = "0x4A679253410272dd5232B3Ff7cF5dbB88f295319";
    let AIRDROP_ADDR = "0x09635F643e140090A9A8Dcd712eD6285858ceBef";
    let MT_KEYS_PATH = "./test/temp/mt_keys_32.txt"

    let [collector] = await hre.ethers.getSigners();
    console.log(collector.address)

    let merkleTreeAndSource = readMerkleTreeAndSourceFromFile(MT_KEYS_PATH);
    let redeemIndex = 3;
    let key = merkleTreeAndSource.leafNullifiers[redeemIndex];
    let secret = merkleTreeAndSource.leafSecrets[redeemIndex];

    let proof =
        await generateProofCallData(
            merkleTreeAndSource.merkleTree,
            key,  // nullifier 
            secret,
            collector.address,
            WASM_BUFF,
            ZKEY_BUFF);
    console.log("Proof: ", proof);

    let keyHash = toHex(pedersenHash(key)); // key of the nullifier => need to be passed to avoid double spending

    let airdropContract = await hre.ethers.getContractAt("PrivateAirdrop", AIRDROP_ADDR)
    let tx = await airdropContract.collectAirdrop(proof, keyHash);
    await tx.wait();
    console.log("Collected!")
    let zekoNFT = await hre.ethers.getContractAt("ZekoGenerativeNFT", ERC721_ADDR)
    let balance = await zekoNFT.balanceOf(collector.address);
    let ownerOf1 = await zekoNFT.ownerOf(1);
    console.log(`Collector balance: ${balance.toString()}`)
    console.log(`Owner of Token ID 1: ${ownerOf1.toString()}`)
    console.log(await zekoNFT.TransferCounterForTokenId(1));
    console.log(await airdropContract.nextTokenIdToBeAirdropped());
}

main().then(() => process.exit(0))
    .catch(e => {
        console.error(e);
        process.exit(-1);
    })