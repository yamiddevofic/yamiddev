import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import icon from "astro-icon";
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  site: 'https://www.yamid.dev',
  output: "static",
  integrations: [
    react(),
    tailwind(),
    icon()
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
