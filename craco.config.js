const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@components': path.resolve(__dirname, './src/shared/components'),
      '@services': path.resolve(__dirname, './src/shared/services'),
      '@context': path.resolve(__dirname, './src/shared/context'),
      '@layout': path.resolve(__dirname, './src/shared/layout'),
      '@routes': path.resolve(__dirname, './src/routes'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@': path.resolve(__dirname, './src'),
    },
  },
};