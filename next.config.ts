import type { NextConfig } from "next";

// next.config.js
module.exports = {
  reactStrictMode: false,
  output: "standalone",
  eslint: {
    ignoreDuringBuilds: true,
  }
};


const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
