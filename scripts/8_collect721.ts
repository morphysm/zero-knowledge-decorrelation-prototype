// Collect against locally created merkle tree (only the first 4 commitments)
const hre = require('hardhat');
import { readFileSync } from 'fs';
import { getMerkleTreeFromPublicListOfCommitments } from '../utils/TestUtils';
import {
  generateProofCallData,
  pedersenHash,
  toHex,
} from 'zkp-merkle-airdrop-lib';

/** Collect an airdrop from the local merkle tree against deployed contract. */
async function main() {
  let AIRDROP_ADDR = '0x3Aa5ebB10DC797CAC828524e59A333d0A371443c'; // TO MODIFTY

  let singers = await hre.ethers.getSigners();
  let collector = singers[1];

  // TO MODIFTY
  let proof =
    '0x2c1ffd9a6b1752953588f4726288e1b8fde3320a39d0552054b60842c6b5b82d27cdc7bc9709cbaea92080a843645716ccc0703bb9f0619a27b14b94b50a29591ec4d437a4bc06e7c28306647b1538133efd58f564b1f2043895cfad1d683ff015c707158278308aa20ee70d7e80a4f6e85409c4ebec225ec86198f8f47ab0782446a61cd355ab9ba36516fce349159a0198de980f1bd24fa013ec14a20ef45d010e1334e373ee64b5b9b5ead8b4b3b7a080be985ba2efd23096577ccc59321003ca42836e04cb3e274157f4b629482e7372663de91f00f5a1227d129b0ab0460e6d21d5dcdfa3650326e4383992fa9319a39bd753a4cce232f1099c38eaea550fb5d1a9caec0ed1b1f892c7262de2a7d7104581a15cf5f1479ec298df3a8a982d768f0dd8b2b5d04b17b66549d4f2d895e17a03b89ee5ec1db1bb6abf01d23a0438fefbfced84c79bafabad24cedc9b0f1a1794fae229de41a964b41c2200520b0fa670e6a33adfb8e2e58a0ceca4e5231c07b614aa31e52a73106bac69ee512171cccf4d45ec2d948672c8e6c778c23dd8c63401e16db4d7ce73d78bbffa752e0825d2bf8e538da850fefdbf2a4988ae95fb4b27f8cc3cccff6fe1e50e057b03d232b1be701fcd26a128d7b11884e678356aa78f378961c4219b5fbb93d5be2eaebc8543e333fa5f2d23b9683be3dff6b4e26104cffc04452735f10337a9381bb6dd606b103fed3f5cb6046949a2d37a479056dd00131853222ab794c14d6d045b4a0018fba4f09f7cb90294801a2c5c80a9ba5a4c0e5f55919f00a56b51811f7fdf4a0f451d1b41b2170f00ad29e81e36213031b02d1f587dc42df0e8ab8d07c05dee9a11b63a9cfe162348a5b8871f262addc5dc1505244c3397f7a4d83d27a5710924538544bf04ac3698f626fe79553ef756acdbe7dd622767ba1ba5d0165d9a130f8b50c7e0a398dbd0a18c6c2328d974a1bd45c172a8f28f6411e927279cf34bea405928f568044c9b6b838d932d84486efed1817c8d5b45b7c8c5b70ffb5c9ffe9db39f261a745457da9f7867e02133cc08d23f6b4cf848ad5e614712f986060a6241750556af967eb208e01200f018c2775223236fe5be1b45cc5f';
  let nullifierHash =
    '0x1893170d37454d7aaec61425c8cd8cc653adf6490b6cb63ceeb3f6f6fdad4eeb';
  let reward =
    '0x000000000000000000000000000000000000000000000000000000000000002a';

  let airdropContract = await hre.ethers.getContractAt(
    'PrivateAirdrop',
    AIRDROP_ADDR
  );
  let tx = await airdropContract
    .connect(collector)
    .collectAirdrop(proof, nullifierHash, reward);
  await tx.wait();
  console.log(
    `Proof verified => NFT succesfully collected by ${collector.address}!`
  );
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(-1);
  });
