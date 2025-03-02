import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    MUST_MOCK_API: process.env.MUST_MOCK_API,
  }
};

export default nextConfig;
