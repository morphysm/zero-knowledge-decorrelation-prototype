// Collect against locally created merkle tree (only the first 4 commitments)
const hre = require("hardhat");
import { readFileSync } from "fs";
import { getMerkleTreeFromPublicListOfCommitments } from "../utils/TestUtils";
import { generateProofCallData, pedersenHash, toHex } from "zkp-merkle-airdrop-lib";

/** Collect an airdrop from the local merkle tree against deployed contract. */
async function main() {
    
    // TO ADD
    let AIRDROP_ADDR = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
    
    let singers = await hre.ethers.getSigners();
    let collector = singers[1]

    // TO ADD
    let proof = "0x2a5ad038791e94a255f38dc3c4c5a784294a4b2544d1ed67e33dae337590e4a00b0ba4dffb56894b1ae7ab763d751a4d0707a8d578185834ece17817228036a81cfdd94fb75adecf4b23383dcaa6569911930c24138619cb888eec75bf67ca3a07fd9bd59cdbe3d504d94000689e86f70be4eb2935426769ccd627f9afa7d5a101a186ab757ef38a94775ae3be802dcee8c35b5f7cd63ca9fac00f90e5125b2309d4bf3bb70a9ac6c8176700011bc6ed4b09c6f73e9d419efe1f1c57f2552ede09a6e769809650d61bfbacc25502f6823f57b542cadba8974f596dfec4b186d62df60989f243f28553c9389063d1ab5ca1c1a117e085daaec7d8009f546c1191029db4f57a1779791936c70df3e88e1a23133f12147b4db5532ee1103d86e9f80130ae65992c242908c942d18edef40a7e2189919bc5137f961133b98afdeecc22f09fd57d79c27f98edb856916895e5a067d1d2f88c9e67741bd92ad4b965c70cd8286a2aa86679b482ee1404c9abea202ee8bb3391b6d917ea3d70037355cb2853bd12236c90e0df91336f03b910c16f65eb461ee2da316ff3bf759cadf6831f348aa785268741b0fe5a583aed80d27d52393aaca746cf366ffb9ed078324611fe2755fa903c265c220b14abd41d25365f441a8010e2313aba25d463c71b682d5f145dfdd0d8c06b75b89a2eedef6aebc140c6481bc76aadc48627c35af00c03e4a97449485cfcc9b5b760bd933d07ee16148db69d6aa4828dde7356b21c11050a8f1e5ba816e5ca08e1e2763e8350b90a4e202417bbd2e164b26cf6d75bfd0f7936502f869ec2cb1f947caa69a288d695db4cdb86fb52955c4cf62d84372c04cf2aabc27860749f0ad97ef2d93750f7ba822a886863ee79f8ed75a3c6afbc1b1b3be6b691da7ff59840add16aaab2b773abfb50c7d790b75e5e947e29994e10dde6f7a32e2da4fb1da2761f817d25a3af2b20e9b6a0bab97104055167597008dfa67d8159f881273ae600c19111a88f36e771376f380a5c81e2b9586d4ee32ff021f255b557dd5011b96a865ec606193735ef5096b9a7c0868c352f01d81619fad1ec6aedde4b43a1187295b13805d56e585ae1f6730c05623c2f4c1b2c32"
    let nullifierHash = "0x07e92a47cf387bd0deab195d310f16c5d8628d0ebd504fa2e2bf908843fd0678"

    let airdropContract = await hre.ethers.getContractAt("PrivateAirdrop", AIRDROP_ADDR)
    let tx = await airdropContract.connect(collector).collectAirdrop(proof, nullifierHash);
    await tx.wait();
    console.log(`Proof verified => NFT succesfully collected by ${collector.address}!`)

}

main().then(() => process.exit(0))
    .catch(e => {
        console.error(e);
        process.exit(-1);
    })