import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  env: {
    MUST_MOCK_API: process.env.MUST_MOCK_API,
    NEXT_PUBLIC_API_URL: "https://api.habits.jspereiramoura.dev.br"
  }
};

export default nextConfig;
