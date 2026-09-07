import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  site: 'https://www.yamid.dev',
  output: "static",
  // El sitio es estático salvo las rutas que declaran `prerender = false`
  // (hoy solo /api/contact), que Vercel ejecuta como función serverless.
  adapter: vercel(),
  integrations: [
    react(),
    tailwind(),
    sitemap()
  ],
  vite: {
    server: {
      watch: {
        usePolling: true,
        interval: 100,
      },
    },
    plugins: [
      {
        name: 'vite-plugin-svgr',
        enforce: 'pre',
        transform(src, id) {
          if (id.endsWith('.svg')) {
            return `export default ${JSON.stringify(src)}`;
          }
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    }
  },
});
