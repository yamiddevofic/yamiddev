import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    /** Fecha de publicación en formato YYYY-MM-DD. */
    date: z.coerce.date(),
    /** Categoría mostrada bajo el título. Opcional. */
    category: z.string().optional(),
    /** Imagen destacada: ruta dentro de public/, p. ej. "/images/post-1.jpg". */
    image: z.string().optional(),
    /** Un borrador no se publica en el build de producción. */
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
