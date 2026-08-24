import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Vercel deployment par TypeScript build errors ignore karega
    ignoreBuildErrors: true,
  },
  eslint: {
    // Build ke dauran ESLint warnings/errors ko ignore karega
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;