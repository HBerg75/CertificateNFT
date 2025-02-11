import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // experimental: {
  //   reactCompiler: true,
  // },
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
