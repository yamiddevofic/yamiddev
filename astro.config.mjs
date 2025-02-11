import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import icon from "astro-icon";

export default defineConfig({
  integrations: [
    react(),
    tailwind(),
    icon()
  ],
  vite: {
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
  },
});
