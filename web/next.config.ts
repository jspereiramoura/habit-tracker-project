import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  env: {
    MUST_MOCK_API: process.env.MUST_MOCK_API,
  }
};

export default nextConfig;
