import { ethers } from "hardhat";
import { Signer } from "ethers";
const { expect } = require("chai");

import { PrivateAirdrop, ZekoGenerativeNFT } from "../typechain";
import {
  getMerkleTreeFromPublicListOfCommitments,
  addNewCommitment,
  generateProofCallData,
  pedersenHash,
  pedersenHashFinal,
  pedersenHashPreliminary,
  toHex,
} from "zkp-merkle-airdrop-lib";
import { readFileSync } from "fs";

const REDEPTIONS = BigInt(1);
const INPUT_FILE_NAME = "./test/publicCommitments.txt";
const CIRCUIT_PATH = "./node_modules/circuits/build";
const WASM_PATH = CIRCUIT_PATH + "/circuit_js/circuit.wasm";
const ZKEY_PATH = CIRCUIT_PATH + "/circuit_final.zkey";
const TREE_HIGHT = 5;
const DAO_NAME = "Famed Badges";
const DAO_ROLE = "Famed Contributor";
const NFT_QUANTITY = 8;

describe("Airdrop", function () {
  let accounts: Signer[];
  let airdropContract: PrivateAirdrop;
  let zekoGenerativeNFTContract: ZekoGenerativeNFT;

  let validProof: string;
  let validNullifierHash: string;

  beforeEach(async function () {
    const mt = await getMerkleTreeFromPublicListOfCommitments(
      INPUT_FILE_NAME,
      TREE_HIGHT
    );
    const merkleTreeRoot = mt.getRoot();

    accounts = await ethers.getSigners();

    const zekoGenerativeNFTFactory = await ethers.getContractFactory(
      "ZekoGenerativeNFT"
    );
    zekoGenerativeNFTContract = await zekoGenerativeNFTFactory.deploy();

    const plonkFactory = await ethers.getContractFactory("PlonkVerifier");
    const plonkContract = await plonkFactory.deploy();

    const airdropFactory = await ethers.getContractFactory("PrivateAirdrop");
    airdropContract = await airdropFactory.deploy(
      zekoGenerativeNFTContract.address,
      REDEPTIONS,
      plonkContract.address,
      merkleTreeRoot
    );

    // NFT MINTING
    await zekoGenerativeNFTContract.mintRoleToAirdrop(
      DAO_NAME,
      DAO_ROLE,
      NFT_QUANTITY,
      airdropContract.address
    );
  });

  it("should allow a user that provides a valid proof to collect an NFT from the airdrop contract", async () => {
    const nullifierHex =
      "0x00a88cb7c2ab7f014b7b9cca92d42b7fe9416d4a1d9872267aefc2e8a6388c66";
    const secretHex =
      "0x00fb4a7280d470f619c59a341c65e874acc1f0b890815e07f41531f878e9ba08";
    const rewardIDHex = toHex(BigInt(1));

    const nullifier = BigInt(nullifierHex);
    const secret = BigInt(secretHex);
    const rewardID = BigInt(rewardIDHex);
    const preCommitment = await pedersenHashPreliminary(nullifier, secret);
    const commitment = await pedersenHashFinal(preCommitment, rewardID);
    const hexCommitment = toHex(commitment);

    console.log(
      `My private values are nullifier: ${nullifierHex} and secret ${secretHex}`
    );

    // update the public list of commitments
    await addNewCommitment(INPUT_FILE_NAME, hexCommitment, TREE_HIGHT);
    // generate the merkconstree
    const mt = await getMerkleTreeFromPublicListOfCommitments(
      INPUT_FILE_NAME,
      TREE_HIGHT
    );
    const newRoot = mt.getRoot();
    console.log(
      `new commitment ${hexCommitment} added to the commitments merkle tree`
    );

    //update the root on Private Airdrop contract
    await airdropContract.updateRoot(newRoot);
    console.log(
      `merkleRoot storage variable at @private Airdrop contract succesfully updated to ${newRoot}`
    );

    // GENERATE PROOF CALL DATA
    const WASM_BUFF = readFileSync(WASM_PATH);
    const ZKEY_BUFF = readFileSync(ZKEY_PATH);

    const collector = accounts[1];
    const collectorAddress = await collector.getAddress();

    console.log("Generating Proof...");
    validProof = await generateProofCallData(
      mt,
      nullifier,
      secret,
      rewardID,
      collectorAddress,
      WASM_BUFF,
      ZKEY_BUFF
    );

    const nullifierHash = await pedersenHash(nullifier);
    validNullifierHash = toHex(nullifierHash); // hash of the nullifier => need to be passed to avoid double spending

    console.log("Proof: ", validProof);
    console.log("nullifierHash", validNullifierHash);

    await airdropContract
      .connect(collector)
      .collectAirdrop(validProof, validNullifierHash, toHex(rewardID));

    console.log(
      `Proof verified => NFT succesfully collected by ${collectorAddress}! without knowing which commitments corresponds to this verification!`
    );

    const balance = await zekoGenerativeNFTContract.balanceOf(collectorAddress);
    expect(balance.toNumber()).equal(1);
  });

  it("should revert if a user provides an invalid proof", async () => {
    const collector = accounts[2];
    const invalidProof =
      "0x23ce5bf1a7f54c75973039fc8d8ce29db3e8b130d9363888c3ffcf4976bd796a0dd560720686da541fd9176f5bdfc443e7fe468ec4a41493217c52615bebb3613060ec95f693ee572aa9b43690b487d5c27e38cb3fb6f635008db95092a1ed482ef1ca3a56cc8752b01a159746fca0265823b99f88c2ffefc4464c75efffeb1614345a63880208eec46fef6fb51f2d431427d5f859d2a14ddb42c7c5f5c615c6250fba65aa124ada140d81015e96d090a9b7a564bbc09018202af4a78a2f2b7c13453c70a55db63c38becb9c6aac170a8035c2678e65609c66335ff94feb8c810c55afb6a7c2d81af944129e63995e1c980818e42eac3203cef778a2064ffb241d587ea515a6afe9938f6da6c1c92477375abf764c2940849080b11449aa60531f427e255362e1334b775a7c08593d0782690b925560164ba8f6c19057f4dd9f0941d3262dc73931ef7ceb8be210fffe40b2e53d4fbd9c02e4bb09b501ba820308c0bf7576485e0fe530fab1642ae3f691bef87be502af247445e0bded86098a0aea3cc9e8a8ad5a4ffcc4faafc791ee87dacf17d0f1d4d81cc43b82ae54dd7c28850774c1d8bdc25d1bece05a3c4e28c60fcd6437d20f826ce05cbbb84e16ef19d30d1dee5444b1beca7b402cd6c2759dd19535320f85b5b685263fc019b2f504dbc30122c47b9bec5f80115e88bdad3025bc947b9f6b327ddb602a447a3e4321cb6c61f47bd3ef5b0ca56c97b691843c7cf6eedfe86fbe3ba03fe74a73562a1fb137d81ae8cddb4a56744c8e4535ee31305eac5f6ec623cf460f157b9b74bc0b8c333b55e89a91bf15bfa54ba871873be26101ea9c3487cf1d7e7d26c3a33903e3bbb2f19af0bc584f87747e94528ad432d70a81bdf8bd4de0e072b1075cd92d745f29005ccc6c96a8e0e5a80d9b5bf4ad932bbebb2e255fed1b7f20ecde3d27621bc9ae53d93b548e2e6bd5e96fd553bf1ade119b31447b7cb11a55b0367a0da64e016196cca59b2fe883125ad22172a8ea35a12bac112181b6c29a6967a11f0b6ed9e7331d2e7566f1c0261e85d66edfaf979d0f5e3796546918b8faf74b18216a9c691dd0b5e273f5e6c2adbe38a49a549fe3adebd46f747fe9f41d8e5b";
    const invalidNullifierHash =
      "0x18659e56dc8c7befc9080154494b4167ba42e3b1ffc9390b222abd8f2d00223d";
    await expect(
      airdropContract
        .connect(collector)
        .collectAirdrop(invalidProof, invalidNullifierHash, toHex(BigInt(42)))
    ).to.be.reverted;
  });

  it("should revert if a user provides a valid proof which has already been used", async () => {
    const collector = accounts[2];
    await expect(
      airdropContract
        .connect(collector)
        .collectAirdrop(validProof, validNullifierHash, toHex(BigInt(42)))
    ).to.be.reverted;
  });

  it("should revert if a user provides a valid proof with an invalid nullifier hash", async () => {
    const collector = accounts[2];
    const invalidNullifierHash =
      "0x18659e56dc8c7befc9080154494b4167ba42e3b1ffc9390b222abd8f2d00223d";
    await expect(
      airdropContract
        .connect(collector)
        .collectAirdrop(validProof, invalidNullifierHash, toHex(BigInt(42)))
    ).to.be.reverted;
  });

  it("should expect that the airdropped token is not transferable", async () => {
    const collector = accounts[2];
    const collectorAddress = await collector.getAddress();
    const receiverAddress = await accounts[4].getAddress();
    await expect(
      zekoGenerativeNFTContract
        .connect(collector)
        .transferFrom(collectorAddress, receiverAddress, 1)
    ).to.be.reverted;
  });

  it("should have token ID 2 as nextTokenIdToBeAirdropped after the first airdrop happened", async () => {
    await zekoGenerativeNFTContract.mintRoleToAirdrop(
      DAO_NAME,
      DAO_ROLE,
      NFT_QUANTITY,
      airdropContract.address
    );
    const worldBaseTokenId = await airdropContract.worldBaseTokenId();

    expect(worldBaseTokenId.toNumber()).equal(NFT_QUANTITY + 1);
  });
});
