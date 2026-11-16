type Experience = {
  name: string
  title: string
  date: string
  logo: string
  bullets: string[]
  tech?: string[]
}

export const EXPERIENCE: Experience[] = [
  {
    name: 'Monash University',
    title: 'Senior Software Developer',
    date: '2025 - Present',
    logo: '/cv/logos/monash-university.webp',
    bullets: [
      'Contributed to the enterprise transformation program replacing the legacy student management system with Ellucian, working across integration, analysis and cloud delivery.',
      'Refactored 12+ downstream GCP applications to align with Ellucian APIs and Banner database schemas, and built custom enterprise extensions on top of the platform.',
      'Architected and deployed cloud services on GCP using Terraform, Cloud Run, Docker and CI/CD, and built tooling for rapid MVP prototyping.',
      'Designed Okta authorisation flows using OIDC, with access controlled through OR (organisational relationship) groups.',
      'Led developer onboarding and technical training, and supported production reliability and monitoring across the new platform.',
    ],
    tech: [
      'Okta',
      'OIDC',
      'GCP',
      'Terraform',
      'Cloud Run',
      'Docker',
      'CI/CD',
      'Ellucian',
      'Banner',
      'Node.js',
    ],
  },
  {
    name: 'Monash University',
    title: 'Senior Front-end Developer',
    date: '2021 - 2024',
    logo: '/cv/logos/monash-university.webp',
    bullets: [
      'Architected and maintained monash.edu and the university-wide Design System (Storybook/Figma), adopted across the domain.',
      'Led front-end architecture and delivery of the Monash Staff Portal (staff.monash.edu) using Next.js, TypeScript, Turborepo, Okta/Firebase Auth and GCP Cloud Run.',
      'Delivered Monash Enrich (enrich.monash.edu), a student-facing platform serving 100,000+ students, shipping search and quiz features under a strict 3-month deadline using Google App Engine.',
      'Spearheaded WCAG 2.1 accessibility compliance, automated Playwright E2E testing and core web performance optimisations.',
    ],
    tech: [
      'React',
      'Next.js',
      'TypeScript',
      'Turborepo',
      'Storybook',
      'Figma',
      'Firestore',
      'Playwright',
      'GCP',
    ],
  },
  {
    name: 'We Make Websites',
    title: 'Technical Lead',
    date: '2016 - 2020',
    logo: '/cv/logos/we-make-websites.webp',
    bullets: [
      'Scaled and led an engineering team from 11 to 25+ developers across London and NYC, establishing coding standards, code reviews, CI/CD and mentorship.',
      'Architected custom applications, third-party integrations and an internal component-based design system and proprietary framework.',
      'Led the move to headless development as technical lead across 50+ Shopify Plus and headless commerce builds.',
    ],
    tech: [
      'Shopify Plus',
      'Liquid',
      'JavaScript',
      'GraphQL',
      'Node.js',
      'CI/CD',
    ],
  },
  {
    name: 'Codebar',
    title: 'Coach',
    date: '2015 - 2020',
    logo: '/cv/logos/codebar.webp',
    bullets: [
      'Volunteered as a coach, mentoring first-time coders through building their first web applications.',
    ],
  },
  {
    name: 'Un.titled',
    title: 'Digital Designer',
    date: '2015 - 2016',
    logo: '/cv/logos/untitled.webp',
    bullets: [
      'Worked across print and digital in a 10-person Magento and WordPress agency, moving towards front-end development, build tooling and coding standards.',
    ],
  },
  {
    name: 'University of Melbourne',
    title: 'Communication Designer',
    date: '2012 - 2015',
    logo: '/cv/logos/unimelb.webp',
    bullets: [
      'Designed and built email templates and communications for the university’s $500M research and philanthropy fundraising campaign.',
    ],
  },
]
