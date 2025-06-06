/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: true,
    domains: ['images.pexels.com', 'firebasestorage.googleapis.com']
  },
  experimental: {
    esmExternals: false,
  },
  webpack: (config, { isServer }) => {
    // Disable webpack cache to prevent caching issues
    config.cache = false;
    
    // Handle Firebase compatibility
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

module.exports = nextConfig;