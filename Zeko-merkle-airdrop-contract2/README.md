# ZKP Private Airdrop

## Related Work and Credits

Credit to A16Z (https://github.com/a16z/zkp-merkle-airdrop-contracts). This application modifies the purpose of the core A16Z repo allowing NFT (ERC721) private airdrops as well.

## Purpose

Distribute an NFT airdrop without having to collect users address beforehand. In the Zeko implementation users will just need to authenticate on the frontend with Discord oAuth2, choose the NFT badges that they want to claim and generate a commitment and get, in return, a note of their commitment containing their secret + nullifier that were used to generate the commitment. 

After that, Zeko will assemble a merkle tree containing these commitments and deploy a Private Airdrop contract. Users will be able to claim token by providing the note. The Zero Knowledge characteristic of the contract allows users to demonstrate that their commitment is part of the merkle tree without revealing which commitment is associated to that note. 

By doing that, users can claim a badge that represent their contribution to Dao based on their Discord activity without disclosing their on-chain identity.  

Users' Discord ID will never be tied to the wallet address that owns the badge NFT.

## Setup

- `npm i`
- Circom setup in order to generate circuits: [Circom 2.0 install + snarkjs](https://docs.circom.io/getting-started/installation/)

## Usage 

### collect users commitments

- The commitment is the hash of two random 31-byte values. The first is a "nullifier", the hash of which is disclosed when you withdraw, so that you cannot double-claim your NFT. The second is a secret which is never disclosed. 

How to generate random 31-byte values and therefore the commitment from https://github.com/a16z/zkp-merkle-airdrop-contracts/blob/722921f31ff32b332d7670486c0354f729d66bcb/utils/TestUtils.ts#L74

- The user gets a note back after they create the commitment => similar to what happens with Tornado Cash

- Generate a random merkle tree of height n `ts-node ./scripts/gen_tree.ts` 

    or 

- Generate a tree from a comma list of commitments `ts-node ./scripts/gen_tree_from_file.ts <input file name> <out put file name> <tree height>`

### circom circuits 

- Compile the circuit.circom file. Note: the input in the last line must match the height of the merkle tree. The number of leaves is the amount of commitments you are gonna collect from the users `circom circuits/circuit.circom --sym --wasm --r1cs -o ./build`

- generate zkey => `snarkjs plonk setup build/circuit.r1cs build/pot16_final.ptau build/circuit_final.zkey`
- gen new sol => `snarkjs zkey export solidityverifier build/circuit_final.zkey contracts/compiled/MerkVerifier.sol`

### deploy contracts

- `npx hardhat compile`
- `npx hardhat node` to start a local hosted blockchain
- `npx hardhat run scripts/deploy721.ts --network localhost` => Modify merkle tree source on line 15

### collect NFT against the NFT airdrop contract

- `npx hardhat run scripts/collect721.ts --network localhost` => Modify inputs on line 15,16,17 (ERC721_ADDR,; AIRDROP_ADDR; MT_KEYS_PATH) according to the output of the deployment script 


### Output if the NFT airdrop happened succesfully

Output => 

`Proof:  0x210c82e47618b23129f14a002e5f45b403e4552b44dc76deb63c08ad97fa52082ef39b8097d96e6ed1edad0f237263bcc7f6407142f302c43453ad34dcbde2ea003b7f20290df436fdb273461b8dafc339310e83eb25209200604626176f623f2261d16c8241a23adf9160f781cad1e913570dd659c17c7fc00b2ee5a33f73a4010cfebfd56fbb603592de1a7630fed93aac855e244f0ad6a259a14a3920a0c610e2d17e8fb27e31b6e27a0a858691344fbeb8abb1d260c4e07f130f24736bb200c957e0eeeb4f1b13a8c6065a2b965b41d4cae14914987d7c4a3e55412b159b0b632e6773809bd00b0cefda0e890acbaf5691dc727e78463ec867629346a60d05a0320d3855adbf6b402a3b02a46f08fa325367c768fd6b1f384dd65b28e9762c2e1c7acc269ca09516221e93793b2941817b66370bc1bd1469b29a6dc401b32a864832b302c64c54bb041832283fafeaa9522aa5eede9716177f167708ae6f2fa229de0290ad79d89826096aae26190115a0d221e0557f75fe43d56035d171291bcdf3d7f58659ce51ea739f171906bbc81b4f5a8066d7773f489226308ca71b79554d11ab9f21723c92889d7cfc4a2c330134f2f24ccd2416324f67a617fc009521c9a5a13df60aecd4588b611449e0aaa123509f535bb5c4968ceaaa58b70852a5cde828176e117e40e6f2b9cc0727d8d07e70804180b11a3879179529bc2aa5552117e43c5673280836a7bd4258171e358c66295c83a3dbb03c5bf6b29f1fee3ffee887370a49e6b7909dc5d635bf32503fb5bfa824ea9b134c5a8873502f2f850f901279654d395ac8b5df1bc780757714e0a1b241c56ff5c5d7571cf52e726bc243234c3c88b231f640a6dd89bb61d194feb2edcfcaf3e3be861053c51b0d268cf20b1a0f82758cd9f38e55ff4924e38cb88851b0990cb04c86d617a41bc905533ef88740c7b2297f924d66fdad9666b767ed851eac196431dc72ce971694bbf7cdff46395ead3ca86911169258f88c0f20fd635319e2dc0589b2f6ec1011b02db8d4cd855c94b17d4c0ef88e305827e53e66172040cdd4acbe3f1d6b0bcbf6a000fcd4df63d55dec13f6c5317781f5f217ef1b821c2925d2958cc1ab
Collected!
Collector balance: 1`


## To test the contract 

- Start your localhost `npx hardhat node`
- Run the test `npx hardhat test ./smartContractTest/testMinting.js --network localhost`
