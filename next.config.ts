import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Disable ESLint during builds
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Disable TypeScript errors during builds for production
    ignoreBuildErrors: false,
  },
  serverExternalPackages: ["convex"],
  // Відключаємо static generation
  output: 'standalone',
  webpack: (config, { isServer }) => {
    // Handle Convex imports
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
};

export default nextConfig;
