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
    setupFiles: './src/app/__tests__/setup.ts',
    coverage: {
      reporter: ['text', 'lcov'],
      exclude: [
        'next-i18next.config.js',
        'next.config.js',
        'src/app/pages/api/hello.ts',
        'src/app/utils/entities/**',
        'src/app/utils/constants/**',
        '.next/**',
        'next-env.d.ts',
      ],
    },
  },
  resolve: {
    alias: {
      '@/components/*': path.resolve(__dirname, './src/app/components/*'),
      '@/utils/*': path.resolve(__dirname, './src/app/utils/*'),
      '@/styles/*': path.resolve(__dirname, './src/app/styles/*'),
      '@/pages/*': path.resolve(__dirname, './src/app/pages/*'),
    },
  },
});
