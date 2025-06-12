// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@graphql': path.resolve(__dirname, './src/graphql'),
      '@apollo': path.resolve(__dirname, './src/apollo'),
      '@components': path.resolve(__dirname, './src/components'),
      '@admin': path.resolve(__dirname, './src/Admin'),
      '@client': path.resolve(__dirname, './src/Client'),
    },
  },
});

