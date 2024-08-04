import wallet from "../wba-wallet.json"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { createGenericFile, createSignerFromKeypair, signerIdentity } from "@metaplex-foundation/umi"
import { irysUploader } from "@metaplex-foundation/umi-uploader-irys"
import { readFile } from "fs/promises"

// Create a devnet connection
const umi = createUmi('https://api.devnet.solana.com');

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const signer = createSignerFromKeypair(umi, keypair);

umi.use(irysUploader());
umi.use(signerIdentity(signer));

(async () => {
    try {

        const image = await readFile("/home/thris/solana-starter/ts/cluster1/image.png")
        const imageConv = createGenericFile(image, "thris-rug", {
            tags: [{
                name: 'Content-Type', value: 'image/png'
            }]
        });

        const imageURi = await umi.uploader.upload([imageConv])
        console.log(imageURi);
    }
    catch (error) {
        console.log("Oops.. Something went wrong", error);
    }
})();
