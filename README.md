# PENNY_PEPE meme Token Minting and Authority Management on Solana
This repository demonstrates how to mint fungible tokens on the Solana blockchain using the Metaplex and SPL Token libraries. The script creates a token, mints a specified amount of tokens, and revokes both mint and freeze authorities to ensure the token is immutable after minting.


# 🚀 Getting Started
This repository is organized to provide a structured learning path, from the basics of Solidity to advanced concepts. Whether you're a beginner or an experienced developer, you'll find valuable resources to enhance your understanding and skills.

# 📜 Table of Contents
1. [Project Overview](#project-overview)
2. [Prerequisites](#prerequisites)
3. [Getting Started](#getting-started)
4. [Token Metadata](#token-metadata)
5. [Minting and Authority Revocation](#minting-and-authority-revocation)
6. [License](#license)

### Project Overview

This project mints a token named PENNY_PEPE on the Solana blockchain and revokes both the mint and freeze authorities after minting. The token creation and minting process uses the [Metaplex](https://solana.com/developers/courses/tokens-and-nfts/nfts-with-metaplex)  library, while the revocation of authorities uses the [SPL Token Program](https://spl.solana.com/token) .


### Prerequisites

To run this project, you need the following:

- [Node.js installed.]()
- A Solana CLI Wallet.
- A QuickNode RPC Endpoint (or any Solana RPC URL) for connecting to the Solana network.
- [Pinata](https://pinata.cloud/) or another IPFS service for storing token metadata.

Ensure you have your wallet secret key file in JSON format (e.g., guideSecret.json) that will be used for signing the transactions.
### Getting Started

Installation
Clone the repository:

```
git clone https://github.com/your-username/your-repository-name.git
```

```
cd your-repository-name
```
Install dependencies:

```
npm install
```

Add your secret key:
Save your Solana wallet's secret key as guideSecret.json in the root of the project.

####  Configuration

Make sure to update the RPC endpoint in the script to either the Devnet or Mainnet Solana RPC:

```typescript
const umi = createUmi('https://api.devnet.solana.com'); // Replace with your QuickNode or Solana RPC Endpoint

```

### Token Metadata

This script uses IPFS to store metadata for the token. You can update the metadata URL to point to your own IPFS file.

```typescript
const metadata = {
    name: "PENNY_PEPE",
    symbol: "PEPENY",
    uri: "https://gateway.pinata.cloud/ipfs/YOUR_IPFS_HASH", // Replace with your IPFS URL
};

```

### Minting and Authority Revocation
The script performs the following steps:

1. Creates a new token mint on the Solana blockchain.
2. Mints 800 million tokens.
3. Revokes both the mint authority and freeze authority to make the token immutable.

#### Running the Script
```bash
ts-node index.ts
```

#### Once executed, you will see the following output:

- The public key of the minted tokens.
- Confirmation that the mint authority has been revoked.
- Confirmation that the freeze authority has been revoked.

#### Example Output
```
Successfully minted 800 million tokens ( <MINT_PUBLIC_KEY> )
Mint authority revoked.
Freeze authority revoked.
```
 #### Notes:
- After revoking the mint authority, the token supply will be capped, and no more tokens can be minted.
- After revoking the freeze authority, token accounts cannot be frozen.

---
## License

This repository is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

Happy coding and welcome to the world of Solana !

---

Feel free to explore the repository, experiment with the code, and contribute your own examples and improvements. Let's build the future of decentralized applications together!

if you face any problem https://t.me/rahul03T
