import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title_fr: z.string(),
      title_en: z.string(),
      summary_fr: z.string().max(200),
      summary_en: z.string().max(200),
      tech: z.array(z.string()),
      repo: z.string().url().optional(),
      demo: z.string().url().optional(),
      image: image().optional(),
      featured: z.boolean().default(false),
      order: z.number().default(0),
      date: z.coerce.date(),
    }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    lang: z.enum(['fr', 'en']),
  }),
});

export const collections = { projects, blog };
