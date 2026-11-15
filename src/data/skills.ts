import {
  Cloud,
  Code,
  Database,
  Eye,
  FlaskConical,
  Layers,
  Plug,
  Users,
} from '@lucide/astro'

export const SKILL_GROUPS = [
  {
    title: 'Cloud and delivery',
    icon: Cloud,
    skills: [
      'GCP',
      'Cloud Run',
      'IAM and Secret Manager',
      'Artifact Registry',
      'Terraform',
      'Docker',
      'Vercel',
      'CI/CD (Jenkins, Bitbucket Pipelines, GitHub Actions)',
    ],
  },
  {
    title: 'CMS and platforms',
    icon: Layers,
    skills: [
      'Squiz Matrix',
      'Shopify',
      'Contentful',
      'Prismic',
      'Sanity.io',
      'WordPress',
      'Liquid',
      'Analytics and Google Tag Manager',
    ],
  },
  {
    title: 'Leadership',
    icon: Users,
    skills: [
      'Leading small and large teams',
      'Technical communication and documentation',
      'Managing and resolving client P1 risks',
      'One-on-ones and performance reviews',
      'Mentorship and paired programming',
    ],
  },
  {
    title: 'Integration',
    icon: Plug,
    skills: [
      'REST and GraphQL API consumption and design',
      'API and integration analysis',
      'Enterprise integration (Banner, Salesforce, MuleSoft upstream)',
    ],
  },
  {
    title: 'Languages and frameworks',
    icon: Code,
    skills: [
      'TypeScript',
      'Node.js',
      'React',
      'React Native',
      'Next.js',
      'Vue',
    ],
  },
  {
    title: 'Design and accessibility',
    icon: Eye,
    skills: [
      'Design systems (Storybook, Figma)',
      'WCAG-led development',
      'Adobe Creative Suite (Photoshop, Illustrator, InDesign, After Effects, Lightroom)',
    ],
  },
  {
    title: 'Quality',
    icon: FlaskConical,
    skills: ['Playwright', 'Vitest', 'Cypress', 'Jest'],
  },
  {
    title: 'Data',
    icon: Database,
    skills: ['PostgreSQL', 'Neon', 'Firestore'],
  },
]
