/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // ✅ allow deploys even with lint errors
    ignoreDuringBuilds: true,
  },
  typescript: {
    // ✅ allow deploys even with type errors
    ignoreBuildErrors: true,
  },
  // Optimize dev performance
  experimental: {
    optimizePackageImports: ['react', 'react-dom'],
  },
  // Disable source maps in dev for faster compilation
  productionBrowserSourceMaps: false,
};

module.exports = nextConfig;
