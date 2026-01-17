/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.cache = false;
    return config;
  },
  // Ye line build folder ka naam change karegi
  distDir: 'build',
};

module.exports = nextConfig;
