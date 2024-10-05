import { percentAmount, generateSigner, signerIdentity, createSignerFromKeypair } from '@metaplex-foundation/umi'
import { TokenStandard, createAndMint, mplTokenMetadata } from '@metaplex-foundation/mpl-token-metadata'
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import secret from './guideSecret.json';


//const umi = createUmi('https://api.mainnet-beta.solana.com'); //Replace with your QuickNode RPC Endpoint
const umi = createUmi('https://api.devnet.solana.com'); //Replace with your QuickNode RPC Endpoint
// https://api.mainnet-beta.solana.com  
// https://api.devnet.solana.com
const userWallet = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(secret));
const userWalletSigner = createSignerFromKeypair(umi, userWallet);

// Import necessary token program instruction for setting authority
import { TOKEN_PROGRAM_ID, setAuthority, AuthorityType } from '@solana/spl-token';
import {  Connection, Keypair, PublicKey } from '@solana/web3.js';  // Import Connection

const userWallet1 = Keypair.fromSecretKey(new Uint8Array(secret));  // Use Keypair from solana/web3.js
// Use Connection from @solana/web3.js for SPL token program actions
const connection = new Connection('https://api.devnet.solana.com', 'confirmed'); // Replace with your QuickNode RPC Endpoint



const metadata = {
    name: "PENNY_PEPE",
    symbol: "PEPENY",
    uri: "https://gateway.pinata.cloud/ipfs/QmU5KCWrKAq9yovyzzYGe9e34hgUH1ZtCgde4T8iayzSfe",
};

const mint = generateSigner(umi);
umi.use(signerIdentity(userWalletSigner));
umi.use(mplTokenMetadata())

const mintPublicKey = new PublicKey(mint.publicKey);

createAndMint(umi, {
    mint,
    authority: umi.identity,
    name: metadata.name,
    symbol: metadata.symbol,
    uri: metadata.uri,
    sellerFeeBasisPoints: percentAmount(0),
    decimals: 8,
    amount: 800000000_00000000,
    tokenOwner: userWallet.publicKey,
    tokenStandard: TokenStandard.Fungible,
    isMutable:false,
    
  
}).sendAndConfirm(umi)
    .then(async () => {
        console.log("Successfully minted 1 million tokens (", mint.publicKey, ")");
        await setAuthority(
            connection, // connection
            userWallet1, // payer
            mintPublicKey, // mint address
            userWallet1.publicKey, // current mint authority
            AuthorityType.MintTokens, // revoke mint authority
            null, // new authority (null to revoke)
            [userWallet1] // signer
        );
        console.log('Mint authority revoked.');

        // Revoke Freeze Authority
        await setAuthority(
            connection, // connection
            userWallet1, // Use userWallet as Signer, not just the public key
            mintPublicKey, // mint address
            userWallet1.publicKey, // current freeze authority
            AuthorityType.FreezeAccount, // revoke freeze authority
            null, // new authority (null to revoke)
            [userWallet1] // signer
        );
        console.log('Freeze authority revoked.');



    })


    .catch((err) => {
        console.error("Error minting tokens:", err);
    });




