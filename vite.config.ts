import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Definir el puerto como 3000
  },
  css: {
    postcss: './postcss.config.cjs', 
  }
});
