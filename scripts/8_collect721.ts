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
    '0x0158fb69d32b9c893f6d49a04eada716792da9ece80aaeee8814813fe955169925d78836a49ddf00d87251988abae3b8a768ef204d4f5d5cd6a0b3a4a2871c30299740d2e33b229ee2dd65ce7c77bb13f0d5898f4cd9373207ba4cff7559f3980600efaf89a8aaa4c7e98da2a65ec68071878ae3e7a0a2a5d8fb0cecb4b8566922e1d1ce716e308ee1fb27c333f676b892f79ffadec30c3aa0835bb981d945f91e2b51004fa0e7018de89dfaeb92e4b2262c035fdf49740faca07b7ab9b27f7b196f8e70815a2efb16c05ceb52558234573ba3e94fa964377b7ad3472e8679e90309a0bd64c363e1d50a183bf684b621b8dc80394eeb6b64459ed9336a01049208ea5a825e454794984498be3f473d148fe525c5d3eca753b1e228469ed3d2892615d75c94658f2ec59235489c36db6cbfaa4afeb1fe50768e6d0d6264804c9b12b272e6e2412556623fb69dfa0ad8fe247dc5d84b1bca03aaac796dfef9936f13069cb9097b386824ccf726ae1109a913b89a9b4b51167b99b00e9a627e46d41dff2b3ef0b26fdd85aa9559e01412efb8db2c14ced07c4d92dc75362ab24b943031f55678b77ca62a4d231802078151dd519cfa73a4f28acd39f126706a29ae00625e24ad7626632294c43390db563a6c566b8aed7de97e2c95a923bedd53030a8f220393216e5f86228fcf691189626e383bd15ae02a7da6163b564a4edb881764197b0c54032fe0df05895be82006172163f1717ee97cd64f8436af61a83a2d0d002a250f1485a96f58582718de4c8a4e19eb5ff559d4475df85c8e2ef3360570522810a0540ab5c81ad3ac4206d475beaef920872ad36e01335a049b48e60b64f6c8d547a59ca374706e068599843500b257054a2da210713f5c46f020892a4917c08ddbdc5549f435648034eb773fcb6a5802cec015db99e03dd1e5023621ddccb0b019b285e8a4f3dc2b29ac622857929ab2552e14554dbde5eccb3d9a068588a1fe5e0c4d5a0194e46c7d6416dfcc61d76ce5fca228cb2eb094222d0c0f1f1fc310c3752d92acdd74dc2c8a6d9c8b74579baf1c08c92c9c2b1fc5208015a9adc8e51952e82c3a1fd5de7797b562689f51ffd85042a9405043a19daeb7';
  let nullifierHash =
    '0x1af5d29920397057e97cbef95d9c507c7d9b13217b71c678289f99bfc482d567';

  let airdropContract = await hre.ethers.getContractAt(
    'PrivateAirdrop',
    AIRDROP_ADDR
  );
  let tx = await airdropContract
    .connect(collector)
    .collectAirdrop(proof, nullifierHash);
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
