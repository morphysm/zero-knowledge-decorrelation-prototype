# fame-airdrop-prototype

This repository contains the code for the famed airdrop prototype.
It is split into six sub-components:

- backend (backend code)
- circuits (zero knowledge circuits)
- contracts (airdrop solidity contracts)
- frontend (frontend code)
- zkp-merkle-airdrop-lib (js library for zero knowledge airdrops)

# Development

**Start a local development chain:**

```
cd contracts
npx hardhat node
```

**Deploy the contracts (in /contracts):**

```
npm run deploy
```

**Set the backend environment variables (in /backend):**

```
CLIENT_ID=<Github app id>
CLIENT_SECRET=<Github app secret>
ETHEREUM_AIRDROP_ADDRESS=<Address of the airdrop contract>
ETHEREUM_PRIVATE_KEY=<Ethereum private key to interact with contract>
ETHREUM_RPC=<Ethereum (L2) rpc url>
```

**Note:** Env variables can be set in a `.env.local` file in `./backend`

**Start the famed-github-backend:**

Clone https://github.com/morphysm/famed-github-backend.
Check out the `feature/FB-123-retriveRewards` branch.
Follow the instructions in the `famed-github-backend` readme and start the service.

**Start the backend:**

Open new terminal window:

```
cd backend
go run main.go
```

**Start the frontend:**

Open new terminal window:

```
cd frontend
npm run dev
```
