import type { CollectionEntry } from 'astro:content'

export const linkResolver = (
  entry: CollectionEntry<'travels' | 'blog' | 'projects'>,
) => {
  switch (entry.collection) {
    case 'blog':
      return `/blog/${entry.id}`
    case 'projects':
      return `/projects/${entry.id}`
    case 'travels':
      return `/travels/${entry.id}`
    default:
      return '/'
  }
}
