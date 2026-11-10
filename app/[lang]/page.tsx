// app/[lang]/page.tsx
import { Suspense } from 'react';
import Link from 'next/link';
import { en } from '@/locales/en';
import { ur } from '@/locales/ur';
import { Locale } from '@/types';
import { projects, experiences } from '@/data/portfolio';
import { ArrowRight, ExternalLink, Briefcase, Code2 } from 'lucide-react';
export const instant = false;

const dictionaries = { en, ur };

function GithubIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

interface PageProps {
  params: Promise<{ lang: Locale }>;
}

// Separate component to handle the async params data access
async function PortfolioContent({ params }: PageProps) {
  const { lang } = await params;
  const dict = dictionaries[lang] || dictionaries.en;

  const skills = [
    "JavaScript", "TypeScript", "React.js", "Next.js", "Node.js", 
    "Tailwind CSS", "Supabase", "PostgreSQL", "Flutter", "Git"
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 py-12">
      {/* --- HERO SECTION --- */}
      <section id="about" className="py-16 md:py-24 flex flex-col items-start gap-6">             
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">
          {dict.hero.greeting}{' '}
          <span className="text-indigo-600 dark:text-indigo-400">Hassaan Ahmed</span>
        </h1>
        
        <p className="text-xl sm:text-2xl font-medium text-gray-600 dark:text-gray-300">
          {dict.hero.role}
        </p>
        
        <p className="max-w-2xl text-base sm:text-lg text-gray-500 dark:text-gray-400">
          {dict.hero.tagline}
        </p>

        <div className="flex flex-wrap gap-4 pt-4">
          <Link
            href="#projects"
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors"
          >
            {dict.hero.viewProjects}
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </Link>
          
          <Link
            href="#contact"
            className="px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-700 font-medium hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {dict.hero.contactMe}
          </Link>
        </div>
      </section>

      {/* --- FEATURED PROJECTS SECTION --- */}
      <section id="projects" className="space-y-8">
        <h2 className="text-3xl font-bold tracking-tight border-b border-gray-200 dark:border-gray-800 pb-4">
          {dict.sections.projectsTitle}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden bg-white dark:bg-gray-900 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold">{project.title[lang]}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {project.description[lang]}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 text-xs font-medium rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 flex items-center gap-4 text-sm font-medium">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400 hover:text-indigo-600 transition-colors"
                  >
                    <GithubIcon className="w-4 h-4" />
                    {dict.common.sourceCode}
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 hover:underline"
                  >
                    <ExternalLink className="w-4 h-4" />
                    {dict.common.liveDemo}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- WORK EXPERIENCE SECTION --- */}
      <section id="experience" className="space-y-8">
        <h2 className="text-3xl font-bold tracking-tight border-b border-gray-200 dark:border-gray-800 pb-4 flex items-center gap-3">
          <Briefcase className="w-7 h-7 text-indigo-600" />
          {dict.sections.experienceTitle}
        </h2>

        <div className="space-y-6">
          {experiences.map((exp) => (
            <div key={exp.id} className="border-l-2 border-indigo-600 pl-6 space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <h3 className="text-xl font-bold">{exp.role[lang]} <span className="text-indigo-600">@ {exp.company}</span></h3>
                <span className="text-sm text-gray-500 font-medium">{exp.period}</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-400 text-sm">
                {exp.highlights.map((highlight, index) => (
                  <li key={index}>{highlight[lang]}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* --- SKILLS SECTION --- */}
      <section className="space-y-8 pb-12">
        <h2 className="text-3xl font-bold tracking-tight border-b border-gray-200 dark:border-gray-800 pb-4 flex items-center gap-3">
          <Code2 className="w-7 h-7 text-indigo-600" />
          {dict.sections.skillsTitle}
        </h2>

        <div className="flex flex-wrap gap-3">
          {skills.map((skill) => (
            <span
              key={skill}
              className="px-4 py-2 rounded-lg text-sm font-semibold bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 shadow-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}

export default function HomePage({ params }: PageProps) {
  return (
    <Suspense fallback={<div className="py-24 text-center text-gray-500">Loading portfolio...</div>}>
      <PortfolioContent params={params} />
    </Suspense>
  );
}