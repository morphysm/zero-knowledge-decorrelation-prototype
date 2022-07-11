# fame-airdrop-prototype

This repository contains the code for the famed airdrop prototype.
It is split into six sub-components:

- backend (backend code)
- circuits (zero knowledge circuits)
- contracts (airdrop solidity contracts)
- frontend (frontend code)
- zkp-merkle-airdrop-lib (js library for zero knowledge airdrops)

# Development

Start local development chain:

```
cd contracts
npx hardhat node
```

Deploy contracts (in /contracts):

```
npm run deploy
```
