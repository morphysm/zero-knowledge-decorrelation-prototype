// Collect against locally created merkle tree (only the first 4 commitments)
const hre = require("hardhat");
import { readFileSync } from "fs";
import { getMerkleTreeFromPublicListOfCommitments } from "../utils/TestUtils";
import { generateProofCallData, pedersenHash, toHex } from "zkp-merkle-airdrop-lib";

/** Collect an airdrop from the local merkle tree against deployed contract. */
async function main() {
    let WASM_PATH = "./build/circuit_js/circuit.wasm";
    let ZKEY_PATH = "./build/circuit_final.zkey";

    let WASM_BUFF = readFileSync(WASM_PATH);
    let ZKEY_BUFF = readFileSync(ZKEY_PATH);

    let AIRDROP_ADDR = "0x5948fb7e3510a194f955C80f1361837bf37B3fb8";
    
    let commitmentsFileName = "./test/temp/emptyCommitments.txt"

    let [collector] = await hre.ethers.getSigners();

    console.log(collector.address)

    // let merkleTreeAndSource = readMerkleTreeAndSourceFromFile(MT_KEYS_PATH);
    // let redeemIndex = 3;
    // let key = merkleTreeAndSource.leafNullifiers[redeemIndex];
    // let secret = merkleTreeAndSource.leafSecrets[redeemIndex];

    let keyHex = "0x00a2db3bf3f1ce9de2d2ed66e62bbc1fe3a30f625d30b9484cd5d29e3424ab8c"
    let secretHex = "0x0055c39aad23011d47dd026f2181fd7c6bbf936fbd3b4371d5b99ca82f6398de"

    // TO BIG INT
    let key = BigInt(keyHex)
    let secret = BigInt (secretHex)

    // GENERATE MERKLE TREE FROM THE PUBLIC LIST OF COMMITMENTS

    let mt = getMerkleTreeFromPublicListOfCommitments(commitmentsFileName, 5)
    let proof =
        await generateProofCallData(
            mt,
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
    // let zekoNFT = await hre.ethers.getContractAt("ZekoGenerativeNFT", ERC721_ADDR)
    // let balance = await zekoNFT.balanceOf(collector.address);
    // let ownerOf1 = await zekoNFT.ownerOf(1);
    // console.log(`Collector balance: ${balance.toString()}`)
    // console.log(`Owner of Token ID 1: ${ownerOf1.toString()}`)
    // console.log(await zekoNFT.TransferCounterForTokenId(1));
    // console.log(await airdropContract.nextTokenIdToBeAirdropped());
}

main().then(() => process.exit(0))
    .catch(e => {
        console.error(e);
        process.exit(-1);
    })