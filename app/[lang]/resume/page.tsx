// app/[lang]/resume/page.tsx
import Image from 'next/image';
import { en } from '@/locales/en';
import { ur } from '@/locales/ur';
import { Locale } from '@/types';
import { Download } from 'lucide-react';
import ScrollHint from '@/components/ScrollHint';

const dictionaries = { en, ur };

interface PageProps {
  params: Promise<{ lang: string }>;
}

type TimelineItem = {
  period: string;
  title: string;
  sub: string;
};

const container = "mx-auto w-full max-w-[72rem]";
const section = "flex flex-col justify-center py-12 sm:min-h-full sm:py-30";

function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="mt-[2.55rem]">
      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;

        return (
          <li key={idx} className={`relative ps-10 ${isLast ? '' : 'pb-[5.2rem]'}`}>
            <span aria-hidden className="absolute start-0 top-[0.875rem] h-px w-10 bg-brand" />
            {!isLast && (
              <span
                aria-hidden
                className="absolute start-0 top-[0.875rem] -bottom-[0.875rem] w-px bg-brand"
              />
            )}
            <span className="inline-block border border-brand bg-background px-2 py-[3px] text-[0.9rem] leading-5 text-brand">
              {item.period}
            </span>
            <h3 className="mt-4 font-medium text-foreground">{item.title}</h3>
            <p className="mt-4 text-brand">{item.sub}</p>
          </li>
        );
      })}
    </ol>
  );
}

export default async function ResumePage({ params }: PageProps) {
  const resolvedParams = await params;
  const lang = (resolvedParams.lang === 'ur' ? 'ur' : 'en') as Locale;
  const dict = dictionaries[lang] || dictionaries.en;

  const skillsList = [
    "Next.js", "TypeScript", "React.js", "Node.js", "Express.js",
    "Tailwind CSS", "Flutter", "Supabase", "PostgreSQL", "MongoDB",
    "Server Actions", "REST APIs", "WebSockets", "Git", "Vercel"
  ];

  const experiences: TimelineItem[] = [
    {
      period: "May 2026 - Present",
      title: lang === 'en' ? "Full-Stack Developer" : "فل اسٹیک ڈویلپر",
      sub: "Skyline Outlet LLC",
    },
    {
      period: "Jan 2026 - Apr 2026",
      title: lang === 'en' ? "Intern" : "انٹرن",
      sub: "QUMAQ Technologies Pvt. Ltd.",
    }
  ];

  const education: TimelineItem[] = [
    {
      period: "2022 - 2026",
      title: lang === 'en'
        ? "Bachelor of Science in Computer Science"
        : "بیچلرز ان کمپیوٹر سائنس",
      sub: "Barani Institute of Information Technology",
    },
    {
      period: "2016 - 2021",
      title: lang === 'en' ? "SSC & HSSC" : "اعلی ثانوی تعلیم",
      sub: "Cadet College Pallandri",
    }
  ];

  const profileFields = [
    { label: "Name:", value: dict.profile.name },
    { label: "Date of Birth:", value: dict.profile.DOB },
    { label: "Job:", value: dict.profile.job },
    { label: "Location:", value: dict.profile.location },
    { label: "Email:", value: dict.profile.email },
    { label: "Phone:", value: dict.profile.phone },
  ];

  return (
    <div>
      <section className={section}>
        <div className={container}>
          <div className="flex items-center justify-between gap-6">
            <h2 className="heading-marker">{dict.sections.aboutTitle}</h2>
            <a
              href="/resume.pdf"
              download="Hassaan_Ahmed_Resume.pdf"
              className="inline-flex shrink-0 items-center gap-2 h-10 px-5 hover:text-brand transition-colors"
            >
              <Download className="size-4" />
              <span>Download</span>
            </a>
          </div>

          <div className="mt-[3.4rem] flex flex-col md:flex-row md:items-start gap-8 md:gap-10">
            <div className="relative size-[8.4375rem] shrink-0 overflow-hidden rounded-full bg-gradient-to-b from-neutral-100 to-neutral-400 dark:from-neutral-700 dark:to-neutral-900">
              <Image
                src="/profile.jpg"
                alt="Hassaan Ahmed"
                fill
                sizes="135px"
                className="object-cover"
                priority
              />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-navy">{dict.profile.summary}</p>
              <div className="mt-[3.2rem] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[auto_auto_auto] lg:justify-between gap-x-6 gap-y-2">
                {profileFields.map((f) => (
                  <div key={f.label} className="min-w-0 lg:whitespace-nowrap">
                    <span className="text-brand">{f.label}</span>{' '}
                    <span className="text-foreground">{f.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={section}>
        <div className={container}>
          <h2 className="heading-marker">{dict.sections.skillsTitle}</h2>
          <p className="mt-[3.8rem] text-navy leading-loose">
            {skillsList.join(', ')}
          </p>
        </div>
      </section>

      <section className={section}>
        <div className={`${container} grid grid-cols-1 md:grid-cols-2 gap-y-16`}>
          <div className="min-w-0 md:pe-6">
            <h2 className="heading-marker">{dict.sections.experienceTitle}</h2>
            <Timeline items={experiences} />
          </div>

          <div className="min-w-0 md:pe-6">
            <h2 className="heading-marker">{dict.sections.educationTitle}</h2>
            <Timeline items={education} />
          </div>
        </div>
      </section>
      <ScrollHint />
    </div>
  );
}