import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

const networkIP = process.env.MY_NETWORK_IP || "localhost";

module.exports = {
  allowedDevOrigins: [networkIP],
};

export default nextConfig;
