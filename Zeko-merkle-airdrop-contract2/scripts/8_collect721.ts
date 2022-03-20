// Collect against locally created merkle tree (only the first 4 commitments)
const hre = require("hardhat");
import { readFileSync } from "fs";
import { getMerkleTreeFromPublicListOfCommitments } from "../utils/TestUtils";
import { generateProofCallData, pedersenHash, toHex } from "zkp-merkle-airdrop-lib";

/** Collect an airdrop from the local merkle tree against deployed contract. */
async function main() {
    
    // TO ADD
    let AIRDROP_ADDR = "0xf4955374242F4FD04683f4BbEb45474389BC59A8";
    
    let singers = await hre.ethers.getSigners();
    let collector = singers[1]

    // TO ADD
    let proof = "0x29431e8889e0949d62bcc15722303c0601c8be7d1109efa31ff088330223fec315c99f4c29e3e58f30709b6fa889e7bedabf34d03a5bc217b2416ca15697e6d82bc98bec4e6f6b8292c082aeec7a7a056b92e0d80ad0f90fcb7b56b727bcd23e1a1585587a71443b177fd4771cd1076711fa38e779580859352d91c06998ceaa0baacad5a8a0e76ea85afc922677207e3223b711570e125761874f3889cac7850026a6f27da70b86fdf3d8f88d3c5c97c58dfa2e879c9eb67d718196dbe40d660a39e888841533faaaa69cb42e477338d09e93cff9081c742e3b120ed1e490fc27b412349623baab2388d401e6f05bc43d2dc6a75107146c036e74b7d4c4d76a12881a9c57c65425fef533bc7b07ce34faae4f1ee14cdf0866322ac9c50a0b6206baf4d2d1935632f04b609d8c0066c012b05d11cf3e58b190696d1f27426d6413c76cea3955574e7438cbf01fc6c993c56c0879e68336303fc5b16e3c93e6ee302cb4b8ff10f668558fa7e01fcfc275967bffef47043e0a595d75993b3011972bce74f4e10922fa4d03533f9e273916046d1d34de85b77ef240d6507450763f09804f72609fc099e0b84c512d3efd4ff5a2aa5448d481eb22df4bbb57ca8c511a2927077ff48feffaa17a708ff31c2fce5bdc955643e0bd6e41232934fe5e7313fa6e2f7151ebda05a2d2060c20ef889f7dec1fc2593a86407b0e0bb64ee76c14a3eb81d5132d94dd6e6bfb4367648195a15d2a6c8c22365e4a850f005dec0e20c2c6e91e09e5c02376feb5652cf5d62681c14a4b59f5bb15de402642057df30813eb1508a2c54bcc0d45b58f7869d73979cc1bbf7a6a5773bc42da97f7fa6f0c9925efbbdcf2adf513e251a1ed63839e9e74702cee6052debd5f1e967a8b3e21d0658fc73876a03792560feda429bac1f2d4a69f75d8514aac696678737c3528c945b7887c727fd576f0d846764ac1eed6030c84625026eaf0dac142614b9b0e6662cebb2dee2fab00188dca2cdddd196b60e8c473d235a9aa7013a4ab03440523cfccc488e370390aefc5ca151c660c9bc0f36b353f9fda513cb6aa9a7bd8229c838550ec4967cb03d22b67e1a6faec6bee233a2c786572176e33a5888f93"
    let keyHash = "0x03aaa53b12a90b6585aae51283d041facf5c43ac5c0c3346c62f9c03a8678c3e"

    let airdropContract = await hre.ethers.getContractAt("PrivateAirdrop", AIRDROP_ADDR)
    let tx = await airdropContract.connect(collector).collectAirdrop(proof, keyHash);
    await tx.wait();
    console.log(`Proof verified => NFT succesfully collected by ${collector.address}!`)

}

main().then(() => process.exit(0))
    .catch(e => {
        console.error(e);
        process.exit(-1);
    })