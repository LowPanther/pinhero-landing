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
};

module.exports = nextConfig;
