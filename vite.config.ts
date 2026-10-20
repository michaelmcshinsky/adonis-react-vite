import { defineConfig } from 'vite';
import adonisjs from '@adonisjs/vite/client';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [adonisjs(), react()],
  root: 'resources/js',
  build: {
    outDir: '../../public/assets',
    emptyOutDir: true,
  },
});
