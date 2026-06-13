import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const work = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    role: z.string(),
    company: z.string(),
    product: z.string(),
    years: z.string(),
    markets: z.array(z.string()),
    problem: z.string(),
    summary: z
      .object({
        problem: z.string(),
        approach: z.string(),
        outcome: z.string(),
      })
      .optional(),
    order: z.number().default(0),
    collaborators: z.array(z.string()).optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

const sideProjects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/side-projects' }),
  schema: z.object({
    title: z.string(),
    years: z.string(),
    problem: z.string(),
    order: z.number().default(0),
    draft: z.boolean().default(false),
  }),
});

const writing = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/writing' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string(),
    draft: z.boolean().default(true),
  }),
});

export const collections = { work, 'side-projects': sideProjects, writing };
