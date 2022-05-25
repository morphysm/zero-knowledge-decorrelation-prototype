import {
  getMerkleTreeFromPublicListOfCommitments,
  getMerkleRoot,
  randomBigInt,
  addNewCommitment,
} from '../utils/TestUtils';
import { BigNumber } from '@ethersproject/bignumber';
import {
  toHex,
  pedersenHashConcat,
  pedersenHash,
  generateProofCallData,
} from 'zkp-merkle-airdrop-lib';
import { readFileSync } from 'fs';
const hre = require('hardhat');
import { Contract } from '@ethersproject/contracts';

describe('Zeko Minting', () => {
  let zekoNFT: Contract;
  let privateAirdrop: Contract;

  beforeEach(async () => {
    let NUM_ERC721_PER_REDEMPTION = 1;

    let inputFileName = './public/publicCommitments.txt';
    let treeHeight = 5;

    let mt = getMerkleTreeFromPublicListOfCommitments(
      inputFileName,
      treeHeight
    );
    let merkleTreeRoot = getMerkleRoot(mt);

    const zekoNFTFactory = await hre.ethers.getContractFactory(
      'ZekoGenerativeNFT'
    );
    zekoNFT = await zekoNFTFactory.deploy();

    const plonkFactory = await hre.ethers.getContractFactory('PlonkVerifier');
    const plonk = await plonkFactory.deploy();

    const privateAirdropFactory = await hre.ethers.getContractFactory(
      'PrivateAirdrop'
    );
    privateAirdrop = await privateAirdropFactory.deploy(
      zekoNFT.address,
      BigNumber.from(NUM_ERC721_PER_REDEMPTION),
      plonk.address,
      merkleTreeRoot
    );
  });

  test('should mint all the NFTs of the collection to the Airdrop Contract', async () => {
    const daoName = 'Uniswap';
    const daoRole = 'core Developer';
    const quantity = 7;
    const tx = await zekoNFT.mintRoleToAirdrop(
      daoName,
      daoRole,
      quantity,
      privateAirdrop.address
    );
    tx.wait();

    const balance: BigNumber = await zekoNFT.balanceOf(privateAirdrop.address);
    expect(balance.toNumber()).toEqual(7);
  });

  // test('should revert if the mintRoleToAirdrop function is executed by someone who is not the NFT Contract Owner', async () => {
  //   const daoName = 'Uniswap';
  //   const daoRole = 'core Developer';
  //   const quantity = 7;
  //   let signers = await hre.ethers.getSigners();
  //   const notOwnerSigner = signers[1];
  //   await expect(
  //     zekoNFT
  //       .connect(notOwnerSigner)
  //       .mintRoleToAirdrop(daoName, daoRole, quantity, privateAirdrop.address)
  //   ).to.be.reverted;
  // });

  test('should have token ID 1 as nextTokenIdToBeAirdropped before any airdrop happen', async () => {
    const daoName = 'Uniswap';
    const daoRole = 'core Developer';
    const quantity = 7;
    const tx = await zekoNFT.mintRoleToAirdrop(
      daoName,
      daoRole,
      quantity,
      privateAirdrop.address
    );
    tx.wait();
    const nextTokenIdToBeAirdroppedToString =
      await privateAirdrop.nextTokenIdToBeAirdropped();
    expect(nextTokenIdToBeAirdroppedToString.toNumber()).toEqual(1);
  });
});

describe('Zeko Airdrop', () => {
  let zekoNFT: Contract;
  let privateAirdrop: Contract;
  let validProof: string;
  let validNullifierHash: string;

  beforeAll(async () => {
    // Contracts Deployment
    let NUM_ERC721_PER_REDEMPTION = 1;
    let inputFileName = './public/publicCommitments.txt';
    let treeHeight = 5;

    let mt = getMerkleTreeFromPublicListOfCommitments(
      inputFileName,
      treeHeight
    );
    let merkleTreeRoot = getMerkleRoot(mt);

    const zekoNFTFactory = await hre.ethers.getContractFactory(
      'ZekoGenerativeNFT'
    );
    zekoNFT = await zekoNFTFactory.deploy();
    console.log('Contract zekoNFT deployed @', zekoNFT.address);

    const plonkFactory = await hre.ethers.getContractFactory('PlonkVerifier');
    const plonk = await plonkFactory.deploy();
    console.log('Contract plonkVerifier deployed @', plonk.address);

    const privateAirdropFactory = await hre.ethers.getContractFactory(
      'PrivateAirdrop'
    );
    privateAirdrop = await privateAirdropFactory.deploy(
      zekoNFT.address,
      BigNumber.from(NUM_ERC721_PER_REDEMPTION),
      plonk.address,
      merkleTreeRoot
    );

    console.log('Contract privateAirdrop deployed @', privateAirdrop.address);
    // NFT MINTING
    let daoName = 'Zeko Badges';
    let daoRole = 'Hardcore contributor';
    let quantity = '8';
    await zekoNFT.mintRoleToAirdrop(
      daoName,
      daoRole,
      quantity,
      privateAirdrop.address
    );

    console.log(
      `# ${quantity} NFTs succefully minted and trasferred to ${privateAirdrop.address}`
    );
  });

  test('should allow a user that provides a valid proof to collect an NFT from the airdrop contract', async () => {
    let inputFileName = './public/publicCommitments.txt';
    let treeHeight = 5;

    let nullifierHex = toHex(randomBigInt(31));
    let secretHex = toHex(randomBigInt(31));

    let nullifier = BigInt(nullifierHex);
    let secret = BigInt(secretHex);
    let commitment = pedersenHashConcat(nullifier, secret);
    let hexCommitment = toHex(commitment);

    console.log(
      `My private values are nullifier: ${nullifierHex} and secret ${secretHex}`
    );

    // update the public list of commitments
    addNewCommitment(inputFileName, hexCommitment, treeHeight);
    // generate the merkletree
    let mt = getMerkleTreeFromPublicListOfCommitments(
      inputFileName,
      treeHeight
    );
    let newRoot = getMerkleRoot(mt);
    console.log(
      `new commitment ${hexCommitment} added to the commitments merkle tree`
    );

    //update the root on Private Airdrop contract
    await privateAirdrop.updateRoot(newRoot);
    console.log(
      `merkleRoot storage variable at @private Airdrop contract succesfully updated to ${newRoot} `
    );

    // GENERATE PROOF CALL DATA
    let WASM_PATH = './build/circuit_js/circuit.wasm';
    let ZKEY_PATH = './build/circuit_final.zkey';
    // TO ADD
    let WASM_BUFF = readFileSync(WASM_PATH);
    let ZKEY_BUFF = readFileSync(ZKEY_PATH);

    let singers = await hre.ethers.getSigners();
    let collector = singers[1];
    let collectorAddress = collector.address;

    validProof = await generateProofCallData(
      mt,
      nullifier,
      secret,
      collectorAddress,
      WASM_BUFF,
      ZKEY_BUFF
    );

    validNullifierHash = toHex(pedersenHash(nullifier)); // hash of the nullifier => need to be passed to avoid double spending

    console.log('Proof: ', validProof);
    console.log('nullifierHash', validNullifierHash);

    await privateAirdrop
      .connect(collector)
      .collectAirdrop(validProof, validNullifierHash);

    console.log(
      `Proof verified => NFT succesfully collected by ${collector.address}! without knowing which commitments corresponds to this verification!`
    );

    let balance = await zekoNFT.balanceOf(collector.address);
    expect(balance.toNumber()).toEqual(1);
  });

  // test('should revert if a user provides an invalid proof', async () => {
  //   let signers = await hre.ethers.getSigners();
  //   let collector = signers[2];
  //   let invalidProof =
  //     '0x23ce5bf1a7f54c75973039fc8d8ce29db3e8b130d9363888c3ffcf4976bd796a0dd560720686da541fd9176f5bdfc443e7fe468ec4a41493217c52615bebb3613060ec95f693ee572aa9b43690b487d5c27e38cb3fb6f635008db95092a1ed482ef1ca3a56cc8752b01a159746fca0265823b99f88c2ffefc4464c75efffeb1614345a63880208eec46fef6fb51f2d431427d5f859d2a14ddb42c7c5f5c615c6250fba65aa124ada140d81015e96d090a9b7a564bbc09018202af4a78a2f2b7c13453c70a55db63c38becb9c6aac170a8035c2678e65609c66335ff94feb8c810c55afb6a7c2d81af944129e63995e1c980818e42eac3203cef778a2064ffb241d587ea515a6afe9938f6da6c1c92477375abf764c2940849080b11449aa60531f427e255362e1334b775a7c08593d0782690b925560164ba8f6c19057f4dd9f0941d3262dc73931ef7ceb8be210fffe40b2e53d4fbd9c02e4bb09b501ba820308c0bf7576485e0fe530fab1642ae3f691bef87be502af247445e0bded86098a0aea3cc9e8a8ad5a4ffcc4faafc791ee87dacf17d0f1d4d81cc43b82ae54dd7c28850774c1d8bdc25d1bece05a3c4e28c60fcd6437d20f826ce05cbbb84e16ef19d30d1dee5444b1beca7b402cd6c2759dd19535320f85b5b685263fc019b2f504dbc30122c47b9bec5f80115e88bdad3025bc947b9f6b327ddb602a447a3e4321cb6c61f47bd3ef5b0ca56c97b691843c7cf6eedfe86fbe3ba03fe74a73562a1fb137d81ae8cddb4a56744c8e4535ee31305eac5f6ec623cf460f157b9b74bc0b8c333b55e89a91bf15bfa54ba871873be26101ea9c3487cf1d7e7d26c3a33903e3bbb2f19af0bc584f87747e94528ad432d70a81bdf8bd4de0e072b1075cd92d745f29005ccc6c96a8e0e5a80d9b5bf4ad932bbebb2e255fed1b7f20ecde3d27621bc9ae53d93b548e2e6bd5e96fd553bf1ade119b31447b7cb11a55b0367a0da64e016196cca59b2fe883125ad22172a8ea35a12bac112181b6c29a6967a11f0b6ed9e7331d2e7566f1c0261e85d66edfaf979d0f5e3796546918b8faf74b18216a9c691dd0b5e273f5e6c2adbe38a49a549fe3adebd46f747fe9f41d8e5b';
  //   let invalidNullifierHash =
  //     '0x18659e56dc8c7befc9080154494b4167ba42e3b1ffc9390b222abd8f2d00223d';
  //   await expect(
  //     privateAirdrop
  //       .connect(collector)
  //       .collectAirdrop(invalidProof, invalidNullifierHash)
  //   ).to.be.reverted;
  // });

  // test('should revert if a user provides a valid proof which has already been used', async () => {
  //   let signers = await hre.ethers.getSigners();
  //   let collector = signers[2];
  //   await expect(
  //     privateAirdrop
  //       .connect(collector)
  //       .collectAirdrop(validProof, validNullifierHash)
  //   ).to.be.reverted;
  // });

  // test('should expect that the airdropped token is not transferable', async () => {
  //   let signers = await hre.ethers.getSigners();
  //   let collector = signers[2];
  //   let receiver = signers[4];
  //   await expect(
  //     zekoNFT
  //       .connect(collector)
  //       .transferFrom(collector.address, receiver.address, 1)
  //   ).to.be.reverted;
  // });

  test('should have token ID 2 as nextTokenIdToBeAirdropped after the first airdrop happened', async () => {
    let nextTokenIdToBeAirdroppedToString =
      await privateAirdrop.nextTokenIdToBeAirdropped();
    expect(nextTokenIdToBeAirdroppedToString.toNumber()).toEqual(2);
  });
});
