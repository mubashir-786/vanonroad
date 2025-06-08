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
    fontLoaders: [
      { loader: '@next/font/google', options: { subsets: ['latin'] } },
    ],
  },
  webpack: (config, { isServer }) => {
    // Disable webpack cache to prevent caching issues
    config.cache = false;
    
    // Handle Firebase compatibility and undici issues
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        stream: false,
        url: false,
        zlib: false,
        http: false,
        https: false,
        assert: false,
        os: false,
        path: false,
      };
    }
    
    // Exclude problematic modules from bundling
    config.externals = config.externals || [];
    if (isServer) {
      config.externals.push('undici');
    }
    
    // Handle undici module resolution issues
    config.resolve.alias = {
      ...config.resolve.alias,
      'undici': false,
    };
    
    return config;
  },
};

module.exports = nextConfig;