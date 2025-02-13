import { defineConfig } from "@wagmi/cli";
import { foundry, react } from "@wagmi/cli/plugins";

export default defineConfig({
  out: "src/generated.ts",
  plugins: [
    foundry({
      project: "../esgichain-nft",
      include: ["AcademicCertificateNFT.json"],
      deployments: {
        AcademicCertificateNFT: process.env
          .NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
      },
    }),
    react(),
  ],
});
