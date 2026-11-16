type SkillGroup = {
  label: string
  items: string[]
}

export const SKILLS: SkillGroup[] = [
  {
    label: 'Frontend',
    items: [
      'React',
      'Next.js',
      'React Native',
      'TypeScript',
      'JavaScript (ES6+)',
      'HTML5',
      'CSS3/SASS/Tailwind',
    ],
  },
  {
    label: 'Backend & APIs',
    items: [
      'Node.js',
      'NestJS',
      'Express',
      'Fastify',
      'GraphQL',
      'REST APIs',
      'Enterprise Integration',
      'Okta / OIDC Authorisation',
    ],
  },
  {
    label: 'Cloud & DevOps',
    items: [
      'GCP (Cloud Run, App Engine, Secret Manager)',
      'Terraform',
      'Docker',
      'CI/CD (GitHub Actions, Bitbucket Pipelines, Jenkins)',
      'Turborepo',
      'Git/pnpm',
    ],
  },
  { label: 'Data', items: ['PostgreSQL', 'Neon', 'Firestore', 'Prisma'] },
  {
    label: 'Testing & Observability',
    items: [
      'Playwright',
      'Cypress',
      'Vitest',
      'Jest',
      'Sentry',
      'GCP Cloud Monitoring/Logging',
    ],
  },
  {
    label: 'AI & Agentic Workflows',
    items: [
      'MCP (Model Context Protocol)',
      'Google ADK',
      'Vertex AI',
      'Gemini',
      'Tool Calling',
      'LLM Evals',
      'Document AI',
    ],
  },
  {
    label: 'Design & Accessibility',
    items: ['Design Systems', 'Storybook', 'Figma', 'WCAG 2.1 AA'],
  },
  {
    label: 'CMS / Commerce',
    items: [
      'Shopify Plus',
      'Contentful',
      'Sanity',
      'WordPress',
      'Prismic',
      'Squiz Matrix',
    ],
  },
  {
    label: 'Leadership & Delivery',
    items: [
      'Technical Leadership',
      'Architecture',
      'Mentorship',
      'P1 Incident Management',
    ],
  },
]
