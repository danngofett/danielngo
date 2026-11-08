import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    featured_image_src: z.string().optional(),
    featured_image_alt: z.string().optional(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    draft: z.boolean().optional(),
  }),
})

const projects = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    updatedDate: z.coerce.date().optional(),
    publishDate: z.coerce.date().optional(),
    featured_image_src: z.string().optional(),
    featured_image_alt: z.string().optional(),
    year: z.number(),
    url: z.string().url().optional(),
    featured: z.boolean(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean(),
  }),
})

const travels = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/travels' }),
  schema: z.object({
    title: z.string(),
    publishDate: z.coerce.date(),
    country: z.string(),
    description: z.string(),
    featured_image_src: z.string().optional(),
    featured_image_alt: z.string().optional(),
    featured: z.boolean(),
    year: z.number(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean(),
  }),
})

const timeline = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/timeline' }),
  schema: z.object({
    day: z.number(),
    title: z.string(),
    date: z.coerce.date(),
    country: z.string(),
    description: z.string().optional(),
    featured_image_src: z.string().optional(),
    featured_image_alt: z.string().optional(),
    year: z.number(),
    tags: z.array(z.string()).optional(),
    draft: z.boolean(),
  }),
})

const roles = defineCollection({
  loader: glob({ pattern: '**/[^_]*.mdx', base: './src/content/about/roles' }),
  schema: z.object({
    company: z.string(),
    date: z.string(),
    logo: z.string(),
    order: z.number(),
    role: z.string(),
  }),
})

export const collections = { blog, projects, travels, timeline, roles }
