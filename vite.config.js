import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: 'jsdom', // enables HTML in Vitest.
    globals: true,
    setupFiles: './src/__tests__/setup.ts',
  },
  resolve: {
    alias: {
      '@/components/*': path.resolve(__dirname, './src/components/*'),
      '@/utils/*': path.resolve(__dirname, './src/utils/*'),
      '@/styles/*': path.resolve(__dirname, './src/styles/*'),
      '@/pages/*': path.resolve(__dirname, './src/pages/*'),
    },
  },
});
