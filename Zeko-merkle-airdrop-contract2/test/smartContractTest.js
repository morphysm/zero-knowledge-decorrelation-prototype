import { assert, expect } from "chai";
import { readMerkleTreeAndSourceFromFile} from "../utils/TestUtils";
import { BigNumber } from "@ethersproject/bignumber";
import { toHex, pedersenHash, generateProofCallData } from "zkp-merkle-airdrop-lib";
import { readFileSync } from "fs";
const hre = require("hardhat");

describe("Zeko Minting", function () {

  let zekoNFT;
  let privateAirdrop;

  beforeEach(async function () {

    const NUM_ERC721_PER_REDEMPTION = 1;
    const merkleTreeAndSource = readMerkleTreeAndSourceFromFile("./test/temp/mt_keys_32.txt");
    const merkleTree = merkleTreeAndSource.merkleTree;

    const zekoNFTFactory = await hre.ethers.getContractFactory("ZekoGenerativeNFT")
    zekoNFT = await zekoNFTFactory.deploy()

    const plonkFactory = await hre.ethers.getContractFactory("PlonkVerifier")
    const plonk = await plonkFactory.deploy()

    const privateAirdropFactory = await hre.ethers.getContractFactory("PrivateAirdrop")
    privateAirdrop = await privateAirdropFactory.deploy(
      zekoNFT.address,
      BigNumber.from(NUM_ERC721_PER_REDEMPTION),
      plonk.address,
      toHex(merkleTree.root.val))

  });

  it("should mint all the NFTs of the collection to the Airdrop Contract", async function () {

    const daoName = "Uniswap"
    const daoRole = "core Developer"
    const quantity = 7;
    const tx = await zekoNFT.mintRoleToAirdrop(daoName, daoRole, quantity, privateAirdrop.address);
    tx.wait();
    assert.equal(await zekoNFT.balanceOf(privateAirdrop.address), 7);

  });

  it("should revert if the mintRoleToAirdrop function is executed by someone who is not the NFT Contract Owner", async function () {
    const daoName = "Uniswap"
    const daoRole = "core Developer"
    const quantity = 7;
    let signers = await hre.ethers.getSigners();
    const notOwnerSigner = signers[1];
    await expect(zekoNFT.connect(notOwnerSigner).mintRoleToAirdrop(daoName, daoRole, quantity, privateAirdrop.address)).to.be.reverted;
  });

  it("should have token ID 1 as nextTokenIdToBeAirdropped before any airdrop happen", async function () {
    const daoName = "Uniswap"
    const daoRole = "core Developer"
    const quantity = 7;
    const tx = await zekoNFT.mintRoleToAirdrop(daoName, daoRole, quantity, privateAirdrop.address);
    tx.wait();
    const nextTokenIdToBeAirdroppedToString = await privateAirdrop.nextTokenIdToBeAirdropped()
    assert.equal(nextTokenIdToBeAirdroppedToString.toNumber(), 1);
  });
});

describe("Zeko Airdrop", function () {

  let zekoNFT;
  let privateAirdrop;

  before(async function () {

    // Contracts Deployment
    const NUM_ERC721_PER_REDEMPTION = 1;
    const merkleTreeAndSource = readMerkleTreeAndSourceFromFile("./test/temp/mt_keys_32.txt");
    const merkleTree = merkleTreeAndSource.merkleTree;

    const zekoNFTFactory = await hre.ethers.getContractFactory("ZekoGenerativeNFT")
    zekoNFT = await zekoNFTFactory.deploy()

    const plonkFactory = await hre.ethers.getContractFactory("PlonkVerifier")
    const plonk = await plonkFactory.deploy()

    const privateAirdropFactory = await hre.ethers.getContractFactory("PrivateAirdrop")
    privateAirdrop = await privateAirdropFactory.deploy(
      zekoNFT.address,
      BigNumber.from(NUM_ERC721_PER_REDEMPTION),
      plonk.address,
      toHex(merkleTree.root.val))

    // NFT Minting to the Airdrop contract address
    const daoName = "Uniswap"
    const daoRole = "core Developer"
    const quantity = 7;
    const tx = await zekoNFT.mintRoleToAirdrop(daoName, daoRole, quantity, privateAirdrop.address);
    tx.wait();
  });


  it("should allow a user that provides a valid proof to collect an NFT from the airdrop contract", async function () {

    let WASM_PATH = "./build/circuit_js/circuit.wasm";
    let ZKEY_PATH = "./build/circuit_final.zkey";

    let WASM_BUFF = readFileSync(WASM_PATH);
    let ZKEY_BUFF = readFileSync(ZKEY_PATH);

    let MT_KEYS_PATH = "./test/temp/mt_keys_32.txt"

    let signers = await hre.ethers.getSigners();
    let collector = signers[2];
    let merkleTreeAndSource = readMerkleTreeAndSourceFromFile(MT_KEYS_PATH);
    let redeemIndex = 3;
    let key = merkleTreeAndSource.leafNullifiers[redeemIndex];
    let secret = merkleTreeAndSource.leafSecrets[redeemIndex];

    let validProof =
      await generateProofCallData(
        merkleTreeAndSource.merkleTree,
        key,  // nullifier 
        secret,
        collector.address,
        WASM_BUFF,
        ZKEY_BUFF);

    let keyHash = toHex(pedersenHash(key)); // key of the nullifier => need to be passed to avoid double spending

    await privateAirdrop.connect(collector).collectAirdrop(validProof, keyHash);
    const balance = await zekoNFT.balanceOf(collector.address)
    assert.equal(balance.toNumber(), 1);
  });

  it("should revert if a user provides an invalid proof", async function () {
    let signers = await hre.ethers.getSigners();
    let collector = signers[2];
    let invalidProof = "0x23ce5bf1a7f54c75973039fc8d8ce29db3e8b130d9363888c3ffcf4976bd796a0dd560720686da541fd9176f5bdfc443e7fe468ec4a41493217c52615bebb3613060ec95f693ee572aa9b43690b487d5c27e38cb3fb6f635008db95092a1ed482ef1ca3a56cc8752b01a159746fca0265823b99f88c2ffefc4464c75efffeb1614345a63880208eec46fef6fb51f2d431427d5f859d2a14ddb42c7c5f5c615c6250fba65aa124ada140d81015e96d090a9b7a564bbc09018202af4a78a2f2b7c13453c70a55db63c38becb9c6aac170a8035c2678e65609c66335ff94feb8c810c55afb6a7c2d81af944129e63995e1c980818e42eac3203cef778a2064ffb241d587ea515a6afe9938f6da6c1c92477375abf764c2940849080b11449aa60531f427e255362e1334b775a7c08593d0782690b925560164ba8f6c19057f4dd9f0941d3262dc73931ef7ceb8be210fffe40b2e53d4fbd9c02e4bb09b501ba820308c0bf7576485e0fe530fab1642ae3f691bef87be502af247445e0bded86098a0aea3cc9e8a8ad5a4ffcc4faafc791ee87dacf17d0f1d4d81cc43b82ae54dd7c28850774c1d8bdc25d1bece05a3c4e28c60fcd6437d20f826ce05cbbb84e16ef19d30d1dee5444b1beca7b402cd6c2759dd19535320f85b5b685263fc019b2f504dbc30122c47b9bec5f80115e88bdad3025bc947b9f6b327ddb602a447a3e4321cb6c61f47bd3ef5b0ca56c97b691843c7cf6eedfe86fbe3ba03fe74a73562a1fb137d81ae8cddb4a56744c8e4535ee31305eac5f6ec623cf460f157b9b74bc0b8c333b55e89a91bf15bfa54ba871873be26101ea9c3487cf1d7e7d26c3a33903e3bbb2f19af0bc584f87747e94528ad432d70a81bdf8bd4de0e072b1075cd92d745f29005ccc6c96a8e0e5a80d9b5bf4ad932bbebb2e255fed1b7f20ecde3d27621bc9ae53d93b548e2e6bd5e96fd553bf1ade119b31447b7cb11a55b0367a0da64e016196cca59b2fe883125ad22172a8ea35a12bac112181b6c29a6967a11f0b6ed9e7331d2e7566f1c0261e85d66edfaf979d0f5e3796546918b8faf74b18216a9c691dd0b5e273f5e6c2adbe38a49a549fe3adebd46f747fe9f41d8e5b"
    let validKeyHash = "0x18659e56dc8c7befc9080154494b4167ba42e3b1ffc9390b222abd8f2d00223d"
    await expect(privateAirdrop.connect(collector).collectAirdrop(invalidProof, validKeyHash)).to.be.reverted
  });


  it("should revert if a user provides a valid proof which has already been used", async function () {
    let WASM_PATH = "./build/circuit_js/circuit.wasm";
    let ZKEY_PATH = "./build/circuit_final.zkey";

    let WASM_BUFF = readFileSync(WASM_PATH);
    let ZKEY_BUFF = readFileSync(ZKEY_PATH);

    let MT_KEYS_PATH = "./test/temp/mt_keys_32.txt"

    let signers = await hre.ethers.getSigners();
    let collector = signers[2];

    let merkleTreeAndSource = readMerkleTreeAndSourceFromFile(MT_KEYS_PATH);
    let redeemIndex = 3;
    let key = merkleTreeAndSource.leafNullifiers[redeemIndex];
    let secret = merkleTreeAndSource.leafSecrets[redeemIndex];

    let validProof =
      await generateProofCallData(
        merkleTreeAndSource.merkleTree,
        key,  // nullifier 
        secret,
        collector.address,
        WASM_BUFF,
        ZKEY_BUFF);

    let keyHash = toHex(pedersenHash(key)); // key of the nullifier => need to be passed to avoid double spending

    await expect(privateAirdrop.connect(collector).collectAirdrop(validProof, keyHash)).to.be.reverted
  });

  it("should expect that the airdropped token is not transferable", async function () {

    let signers = await hre.ethers.getSigners();
    let collector = signers[2];
    let receiver = signers[4]
    await expect(zekoNFT.connect(collector).transferFrom(collector.address, receiver.address, 1)).to.be.reverted
  });

  it("should have token ID 1 as nextTokenIdToBeAirdropped after the first airdrop happened", async function () {

    const nextTokenIdToBeAirdroppedToString = await privateAirdrop.nextTokenIdToBeAirdropped()
    assert.equal(nextTokenIdToBeAirdroppedToString.toNumber(), 2);

  });

});
