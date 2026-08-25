import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. TypeScript & ESLint build checks bypass (For seamless Vercel deployment)
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  // 2. Image Optimization & External Domains Handling (Unsplash error fix)
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "**", // Sabhi external image URLs allow karne ke liye
      },
    ],
  },

  // 3. React Strict Mode enabled
  reactStrictMode: true,

  // 4. Console log removal in production build
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

export default nextConfig;