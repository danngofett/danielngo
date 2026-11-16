type Education = {
  degree: string
  institution: string
  location: string
  date: string
  description: string
  logo: string
}

export const EDUCATION: Education[] = [
  {
    institution: 'Monash University',
    degree: 'Bachelor of Communication Design (Visual Communication)',
    location: 'Melbourne, Australia',
    date: '2014 - 2015',
    description:
      'Specialised in UX/UI design, branding, typography, and illustration.',
    logo: '/cv/logos/monash.jpg',
  },
  {
    institution: 'RMIT University',
    degree: 'Bachelor of Multimedia Systems',
    location: 'Melbourne, Australia',
    date: '2012 - 2013',
    description:
      'Specialised in web development, graphic design, and video production.',
    logo: '/cv/logos/rmit.jpg',
  },
  {
    institution: 'Melbourne Polytechnic',
    degree: 'Advanced Diploma of Multimedia',
    location: 'Melbourne, Australia',
    date: '2009 - 2011',
    description: 'Specialised in typography, branding, and print design.',
    logo: '/cv/logos/melbourne-polytechnic.jpg',
  },
]
