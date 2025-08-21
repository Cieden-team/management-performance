/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  images: {
    domains: ['images.clerk.dev'],
  },
  // Оптимізація для Vercel
  compress: true,
  poweredByHeader: false,
  // Зменшення розміру бандла
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            enforce: true,
          },
        },
      };
      
      // Оптимізація пам'яті
      config.optimization.minimize = true;
      config.optimization.minimizer = config.optimization.minimizer || [];
    }
    return config;
  },
  // Додаткові оптимізації
  output: 'standalone',
  generateEtags: false,
};

module.exports = nextConfig;
