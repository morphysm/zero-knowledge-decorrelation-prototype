circom circuits/circuit.circom --sym --wasm --r1cs -o ./build
source ~/.profile
snarkjs plonk setup build/circuit.r1cs build/powersOfTau28_hez_final_16.ptau build/circuit_final.zkey
snarkjs zkey export solidityverifier build/circuit_final.zkey contracts/compiled/MerkVerifier.sol
npx hardhat run ./scripts/4_deployContracts.ts --network localhost
npx hardhat run ./scripts/5_mint721.ts --network localhost
npx hardhat run ./scripts/6_collectCommitments.ts --network localhost
npx hardhat run ./scripts/7_GenerateProofCallData.ts --network localhost
npx hardhat run ./scripts/8_collect721.ts --network localhost