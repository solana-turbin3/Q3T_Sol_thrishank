import { Keypair, PublicKey, Connection, Commitment } from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount, mintTo } from "@solana/spl-token";
import wallet from "../wba-wallet.json";

// Import our keypair from the wallet file
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

//Create a Solana devnet connection
const commitment: Commitment = "confirmed";
const connection = new Connection("https://api.devnet.solana.com", commitment);

const token_decimals = 1_000_000n;

// Mint address
const mint = new PublicKey("DB2TMq2j9hQKgxis1w6P5scSQ93ztM3tdtsrRB45EhMM");
const differentAccountPublicKey = new PublicKey(
    "VTwKNtmXi4TQCLZraksAkasMAJmgLgjVT6txUc4mjxN"
);

(async () => {
    try {

        const ata = await getOrCreateAssociatedTokenAccount(
            connection,
            keypair,
            mint,
            keypair.publicKey
        );
        console.log(ata.address.toBase58())
        const mintTx = await mintTo(
            connection,
            keypair,
            mint,
            ata.address,
            keypair,
            10n * token_decimals
        );

        console.log(mintTx);
    } catch (error) {
        console.log(`Oops, something went wrong: ${error}`);
    }
})();
