import path from 'path';
import { defineConfig } from 'vite';
import graphqlLoader from 'vite-plugin-graphql-loader';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react(), tailwindcss(), graphqlLoader()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
