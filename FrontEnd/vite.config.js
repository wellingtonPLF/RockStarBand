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
      '@redux': path.resolve(__dirname, 'src/app/shared/redux'),
      '@models': path.resolve(__dirname, 'src/app/shared/models'),
      '@services': path.resolve(__dirname, 'src/app/shared/services'),
      '@views': path.resolve(__dirname, 'src/app/views'),
    },
  },
});
