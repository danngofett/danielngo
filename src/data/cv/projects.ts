type Project = {
  name: string
  role: string
  date: string
  description: string
  responsibilities?: string[]
  url?: string
  technologies?: string[]
}

export const PROJECTS: Project[] = [
  {
    name: 'myTrellis',
    date: '2026 - Present',
    role: 'Sole Designer and Engineer',
    description:
      'myTrellis is a multi-tenant invoicing platform for sole traders and small businesses. Its AI layer lets assistants like Claude and ChatGPT draft invoices through an MCP server, and turns a PDF or photo into a draft. AI only drafts: totals and dates are computed in code, and a person approves every record.',
    url: 'mytrellis.io',
    responsibilities: [
      'Built an MCP server using standards-based OAuth, with explicit consent, least-privilege access, instant revocation and an audit trail of agent activity.',
      'Prototyped an invoice scanner with Google ADK and Gemini on Vertex AI with a combination of deterministic checks.',
      'Built an evaluation harness to compare engine designs on accuracy, latency and cost per scan.',
      'Designed and built the platform end-to-end: customer and console apps with NestJS REST APIs, tenant-scoped databases, non-linear quote-to-invoice workflows, PDF invoice generation with payment options.',
      'Created the Roots design system in Storybook, and defined infrastructure as code in Terraform on Google Cloud with CI/CD in GitHub Actions.',
      'Automated end-to-end tests with Playwright and set up a testing harness for unit and integration tests with Vitest.',
    ],
    technologies: [
      'MCP',
      'OAuth',
      'Google ADK',
      'Vertex AI',
      'Gemini',
      'AI Agents',
      'Tool Calling',
      'LLM Evals',
      'Document AI',
      'Human-in-the-loop',
      'TypeScript',
      'NestJS',
      'React',
      'Prisma',
      'PostgreSQL',
      'Stripe Connect',
      'Storybook',
      'Terraform',
      'GCP',
      'GitHub Actions',
      'Sentry',
    ],
  },
]
