// app/[lang]/page.tsx
import { Suspense } from 'react';
import { en } from '@/locales/en';
import { ur } from '@/locales/ur';
import { Locale } from '@/types';
export const instant = false;

const dictionaries = { en, ur };

const techLinks = [
  { name: 'React.js', url: 'https://react.dev' },
  { name: 'Next.js', url: 'https://nextjs.org' },
  { name: 'Node.js', url: 'https://nodejs.org' },
  { name: 'Flutter', url: 'https://flutter.dev' },
  { name: 'Supabase', url: 'https://supabase.com' },
  { name: 'PostgreSQL', url: 'https://www.postgresql.org' },
];

interface PageProps {
  params: Promise<{ lang: Locale }>;
}

async function HeroContent({ params }: PageProps) {
  const { lang } = await params;
  const dict = dictionaries[lang] || dictionaries.en;

  return (
    <section className="h-full flex flex-col items-center justify-center text-center">
      {/* 96px bold name at the reference size */}
      <h1 className="text-[clamp(2rem,8vw,3rem)] sm:text-[clamp(2rem,4vw,6rem)]  uppercase leading-none tracking-normal text-foreground">
        Hassaan Ahmed
      </h1>

      <p className="mt-12 text-navy">{dict.hero.role}</p>

      <p className="mt-10 text-navy">
        {lang === 'en' ? `Based in ${dict.profile.location}` : dict.profile.location}
      </p>

      <p className="mt-10 max-w-[87rem] text-navy">
        {dict.hero.intro}{' '}
        {techLinks.map((tech, i) => (
          <span key={tech.name}>
            <a
              href={tech.url}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-foreground underline underline-offset-[3px] hover:text-brand transition-colors"
            >
              {tech.name}
            </a>
            {i < techLinks.length - 1 && ' + '}
          </span>
        ))}{' '}
        {dict.hero.outro}
      </p>
    </section>
  );
}

export default function HomePage({ params }: PageProps) {
  return (
    <Suspense fallback={null}>
      <HeroContent params={params} />
    </Suspense>
  );
}