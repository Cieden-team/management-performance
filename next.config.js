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
            maxSize: 244000,
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            enforce: true,
            maxSize: 244000,
          },
        },
      };
      
      // Оптимізація пам'яті
      config.optimization.minimize = true;
      config.optimization.minimizer = config.optimization.minimizer || [];
      
      // Додаткові оптимізації
      config.optimization.removeAvailableModules = true;
      config.optimization.removeEmptyChunks = true;
      config.optimization.mergeDuplicateChunks = true;
    }
    return config;
  },
  // Додаткові оптимізації
  output: 'standalone',
  generateEtags: false,
  // Зменшення розміру
  swcMinify: true,
  // Вимкнення source maps для production
  productionBrowserSourceMaps: false,
};

module.exports = nextConfig;
