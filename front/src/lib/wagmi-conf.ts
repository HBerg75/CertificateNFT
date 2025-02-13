import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

import { defineChain, http } from "viem";
import { cookieStorage, createStorage } from "wagmi";
import { avalancheFuji } from "wagmi/chains";

export const localnet = defineChain({
  id: 1234,
  name: "ESGIChain",
  nativeCurrency: { name: "ESGI", symbol: "ESGI", decimals: 18 },
  rpcUrls: {
    default: {
      http: [
        "http://127.0.0.1:49440/ext/bc/2FmZZMMKqv7RqWVERYbkKEW2afXp2XDfQdZU1GS1Mk7mx6kjh2/rpc",
      ],
    },
  },
});
// Get projectId from https://cloud.walletconnect.com
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) throw new Error("Project ID is not defined");

const metadata = {
  name: "Web3Modal",
  description: "Web3Modal Example",
  url: "https://web3modal.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

// Create wagmiConfig
const chains = [localnet, avalancheFuji] as const;
export const config = defaultWagmiConfig({
  chains,
  transports: {
    [localnet.id]: http(process.env.RPC_URL),
    [avalancheFuji.id]: http(),
  },
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
});
