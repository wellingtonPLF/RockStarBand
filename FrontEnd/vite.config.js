import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  css: {
    modules: {},
  },
  resolve: {
    alias: {
      '@utils': path.resolve(__dirname, 'src/app/shared/utils'),
      '@enums': path.resolve(__dirname, 'src/app/shared/enums'),
      '@services': path.resolve(__dirname, 'src/app/shared/services'),
    },
  },
});
