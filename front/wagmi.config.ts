import { defineConfig } from "@wagmi/cli";
import { foundry, react } from "@wagmi/cli/plugins";

export default defineConfig({
  out: "src/generated.ts",
  plugins: [
    foundry({
      project: "../esgichain-nft",
      include: ["AcademicCertificateNFT.json"],
      deployments: {
        AcademicCertificateNFT: "0xc0121389925343d46124719e8e8f5683f4228fbf",
      },
    }),
    react(),
  ],
});
