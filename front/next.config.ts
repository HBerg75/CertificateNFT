import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.itnewsinfo.com",
      },
    ],
  },
};

export default nextConfig;
