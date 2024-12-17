import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Configuración de Vite para React + TailwindCSS
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [], // Vite usa automáticamente el postcss.config.js
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Alias para rutas más cortas
    },
  },
  server: {
    port: 3000,       // Puerto personalizado para el servidor
    open: true,       // Abre automáticamente el navegador
  },
  build: {
    outDir: 'dist',   // Carpeta de salida de la build
    sourcemap: true,  // Habilita sourcemaps para debuggear
  },
});
