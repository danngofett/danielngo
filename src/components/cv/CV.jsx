import {
  DETAILS,
  EXPERIENCE,
  PROJECTS,
  SKILLS,
  REFERENCES,
  EDUCATION,
} from '@data/cv'

const SIDEBAR_GRID =
  'grid grid-cols-[280px_1fr] items-start gap-12 print:grid-cols-[170px_1fr] print:gap-6'

function CV() {
  return (
    <div className="container mx-auto max-w-5xl px-8 py-8 print:max-w-none print:px-0 print:py-0">
      <div className="space-y-10 print:space-y-8">
        {/* Header */}
        <div className="grid grid-cols-2 gap-12 print:gap-6">
          <div>
            <h1 className="text-4xl font-bold">{DETAILS.name}</h1>
          </div>

          <div className="text-right text-lg print:text-base">
            <p>{DETAILS.website}</p>
            <p>{DETAILS.email}</p>
            <p>{DETAILS.phone}</p>
          </div>
        </div>

        {/* Executive summary */}
        <div>
          <p className="text-[52px] print:hidden">👋</p>
          <p className="text-2xl print:text-lg">{DETAILS.introduction}</p>
        </div>

        {/* Skills */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Core Technical Skills</h2>

          <dl className="space-y-1">
            {SKILLS.map((group) => (
              <div
                key={group.label}
                className={SIDEBAR_GRID.replace('items-start', '')}
              >
                <dt className="font-semibold">{group.label}</dt>
                <dd>{group.items.join(', ')}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Experience */}
        <div className="space-y-6 print:space-y-4">
          <h2 className="text-2xl font-bold">Professional Experience</h2>

          {EXPERIENCE.map((experience) => (
            <div
              key={`${experience.name}-${experience.date}`}
              className={`${SIDEBAR_GRID} break-inside-avoid`}
            >
              <div className="flex items-center gap-4">
                <img
                  src={experience.logo}
                  alt={experience.name}
                  className="h-16 w-16 shrink-0 rounded-full object-cover print:hidden"
                />

                <div>
                  <h3 className="text-lg font-bold">{experience.name}</h3>
                  <p>{experience.title}</p>
                  <p className="text-neutral-500">{experience.date}</p>
                </div>
              </div>

              <div className="space-y-1">
                <ul className="list-disc space-y-1 pl-4">
                  {experience.bullets.map((bullet, index) => (
                    <li key={index}>{bullet}</li>
                  ))}
                </ul>

                {experience.tech && (
                  <p className="pl-4 text-neutral-600">
                    <span className="font-semibold">Tech:</span>{' '}
                    {experience.tech.join(', ')}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Projects */}
        <div className="space-y-6 print:space-y-4">
          <h2 className="text-2xl font-bold">Selected Projects</h2>

          {PROJECTS.map((project) => (
            <div
              key={project.name}
              className={`${SIDEBAR_GRID} break-inside-avoid`}
            >
              <div className="space-y-1">
                <h3 className="text-lg font-bold">{project.name}</h3>
                <p>{project.role}</p>
                <p className="text-neutral-500">{project.url}</p>
              </div>

              <div className="space-y-2">
                <p>{project.description}</p>

                <ul className="list-disc space-y-1 pl-4">
                  {project.responsibilities.map((responsibility, index) => (
                    <li key={index}>{responsibility}</li>
                  ))}
                </ul>

                <p className="text-neutral-600">
                  <span className="font-semibold">Tech:</span>{' '}
                  {project.technologies.join(', ')}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Education */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Education</h2>

          <div className="grid grid-cols-3 gap-12 print:gap-6">
            {EDUCATION.map((education) => (
              <div key={education.institution}>
                <img
                  src={education.logo}
                  alt={education.institution}
                  className="mb-4 h-16 w-16 rounded-full object-cover print:hidden"
                />
                <h3 className="text-lg font-bold">{education.institution}</h3>
                <p>{education.degree}</p>
                <p className="text-neutral-500">{education.date}</p>
              </div>
            ))}
          </div>
        </div>

        {/* References */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold">References</h2>
          <p>{REFERENCES}</p>
        </div>
      </div>
    </div>
  )
}

export default CV
