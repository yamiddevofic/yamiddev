import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
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
    sitemap()
  ],
  vite: {
    // react-dom/client es CommonJS en React 18 y necesita que Vite lo
    // pre-empaquete a ESM. Como react y react-dom no estan declarados en
    // package.json (llegan como dependencias transitivas de @astrojs/react),
    // el descubrimiento automatico no los alcanzaba: en dev se servia el CJS
    // crudo y el import de createRoot fallaba, dejando las islas sin hidratar.
    // El sitio se veia pero nada respondia. El build de produccion no se veia
    // afectado porque resuelve por otra via.
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-dom/client'],
    },
    server: {
      watch: {
        usePolling: true,
        interval: 100,
      },
    },
    plugins: [
      // Tailwind v4 ya no es una integracion de Astro: se carga como plugin de
      // Vite. @astrojs/tailwind solo soporta Astro 3, 4 y 5, asi que subir a
      // Astro 7 obligaba a este cambio.
      tailwindcss(),
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
