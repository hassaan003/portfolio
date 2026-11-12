// app/[lang]/projects/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { Plus, X } from 'lucide-react';
import { en } from '@/locales/en';
import { ur } from '@/locales/ur';
import { Locale } from '@/types';
import ProjectGallery from '@/components/ProjectGallery';

const dictionaries = { en, ur };

type Project = {
  id: string;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  // The first picture is also the thumbnail on the grid
  images: string[];
  // 'web' = website screenshots, 'mobile' = phone app screenshots
  imageType: 'web' | 'mobile';
  stack: { frontend: string[]; backend: string[] };
  tags: string[];
  category: string;
  githubUrl: string;
  liveUrl: string;
};

// Put the pictures in /public/projects/. To show more pictures for a project,
// just add more paths to its "images" list.
const allProjects: Project[] = [
  {
    id: "wholesale-catalog",
    title: {
      en: "E-Commerce Catalog & Admin Panel",
      ur: "ہول سیل ای کامرس کیٹلاگ اور ایڈمن پینل",
    },
    description: {
      en: "Built a public B2B catalog website and custom admin panel from scratch for 50 brands and 2,000+ products.",
      ur: "۵۰ برانڈز اور ۲۰۰۰+ پروڈکٹس کے لیے بی ٹو بی کیٹلاگ اور ایڈمن پینل تیار کیا۔",
    },
    images: [
      "/projects/wholesale-catalog.png",
      "/projects/wholesale-2.png",
      "/projects/wholesale-3.png",
    ],
    imageType: "web",
    stack: {
      frontend: ["Next.js", "TypeScript", "Tailwind CSS"],
      backend: ["Supabase"],
    },
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
    category: "Next.js",
    githubUrl: "https://github.com/skylineoutlet/skyline-site-new",
    liveUrl: "https://skylineoutletllc.com",
  },
  {
    id: "student-clearance",
    title: {
      en: "Degree Clearance System",
      ur: "ڈگری کلیئرنس سسٹم",
    },
    description: {
      en: "Independently developed MERN-stack student clearance app with CGPA and failed-course eligibility checks.",
      ur: "سی جی پی اے اور فیل شدہ کورسز کی جانچ کے ساتھ ایم ای آر این اسٹیک کلیئرنس سسٹم بنایا۔",
    },
    images: [
      "/projects/student-clearance.png",
      "/projects/clearance-2.png",
    ],
    imageType: "web",
    stack: {
      frontend: ["React.js"],
      backend: ["Node.js", "Express.js", "MongoDB"],
    },
    tags: ["React.js", "Node.js", "Express.js", "MongoDB"],
    category: "React.js",
    githubUrl: "https://github.com/hassaan003/Student-Clearance-System",
    liveUrl: "",
  },
  {
    id: "savings-committee",
    title: {
      en: "Savings Committee App",
      ur: "بچت کمیٹی ایپ",
    },
    description: {
      en: "Mobile app that moves the traditional committee (rotating savings) system online. Built the Flutter frontend and connected it to a Node.js and MongoDB backend with REST APIs.",
      ur: "روایتی کمیٹی سسٹم کو آن لائن لانے والی موبائل ایپ۔ فلٹر فرنٹ اینڈ تیار کیا اور اسے REST APIs کے ذریعے Node.js اور MongoDB بیک اینڈ سے جوڑا۔",
    },
    // Remove any path you don't have a picture for
    images: [
      "/projects/committee-1.png",
      "/projects/committee-2.png",
    ],
    imageType: "mobile",
    stack: {
      frontend: ["Flutter", "Dart"],
      backend: ["Node.js", "MongoDB"],
    },
    tags: ["Flutter", "Dart", "Node.js", "MongoDB"],
    category: "Flutter",
    githubUrl: "https://github.com/hassaan003/Savings-Committee-App",
    liveUrl: "",
  },
];

// Popup headings ("TECH STACK:", project title): bold, uppercase, wide
const popupHeading =
  "font-semibold uppercase leading-snug tracking-[0.05em] text-foreground text-[1.2rem] sm:text-[1.4rem]";

const outlineButton =
  "inline-flex h-14 items-center justify-center px-10 border border-line text-foreground hover:border-brand hover:text-brand transition-colors";

export default function ProjectsPage() {
  const params = useParams();
  const lang = (params?.lang as Locale) || 'en';
  const dict = dictionaries[lang] || dictionaries.en;
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const [active, setActive] = useState<Project | null>(null);
  const filterTags = ["All", "Next.js", "React.js", "Flutter"];
  const filteredProjects = selectedTag === "All"
    ? allProjects
    : allProjects.filter(p => p.tags.includes(selectedTag) || p.category === selectedTag);

  // Close the popup with Escape
  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active]);

  const stackLabels = {
    frontend: lang === 'en' ? 'Frontend:' : 'فرنٹ اینڈ:',
    backend: lang === 'en' ? 'Backend:' : 'بیک اینڈ:',
  };

  return (
    <div className="mx-auto w-full max-w-[76rem] pt-10 lg:pt-16 pb-16">
      {/* Title */}
      <h2 className="heading-marker">{dict.sections.projectsTitle}</h2>

      {/* Text filters */}
      <div className="mt-[3.2rem] flex flex-wrap gap-x-[2.1rem] gap-y-2">
        {filterTags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => setSelectedTag(tag)}
            className={`transition-colors ${
              selectedTag === tag
                ? 'text-brand underline underline-offset-[6px]'
                : 'text-navy hover:text-brand'
            }`}
          >
            {tag === "All" ? dict.common.all : tag}
          </button>
        ))}
      </div>

      {/* Grid: 3 columns, ~37px gap, 380px wide cards at the reference size */}
      <ul className="mt-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-[2.3rem] gap-y-12">
        {filteredProjects.map((project) => (
          <li key={project.id}>
            <button
              type="button"
              onClick={() => setActive(project)}
              className="group block w-full text-center"
            >
              {/* Thumbnail with dark "+" overlay on hover */}
              <span className="relative block aspect-[380/182] overflow-hidden bg-gradient-to-br from-brand/15 to-brand/5">
                <Image
                  src={project.images[0]}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className={
                    project.imageType === 'mobile'
                      ? 'object-contain py-2'
                      : 'object-cover object-top'
                  }
                />
                <span className="absolute inset-0 flex items-center justify-center bg-black/55 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <Plus className="size-10 text-white" strokeWidth={1.25} />
                </span>
              </span>

              <span className="mt-5 block">
                <span className="heading-marker text-[0.9rem]">{project.category}</span>
              </span>

              <span className="mt-1.5 block font-medium uppercase text-foreground transition-colors group-hover:text-brand">
                {project.title[lang]}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {/* ---------- Popup ---------- */}
      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.title[lang]}
          onClick={() => setActive(null)}
          className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-[#0b0d26]/90 p-3 sm:p-0"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative mx-auto w-full max-w-[43.8rem] bg-background pb-12 sm:my-[1.9rem]"
          >
            {/* Close button: white square in the top corner */}
            <button
              type="button"
              onClick={() => setActive(null)}
              aria-label="Close"
              className="absolute end-0 top-0 z-10 grid size-14 sm:size-[4.5rem] place-items-center bg-background text-foreground hover:text-brand transition-colors"
            >
              <X className="size-6" strokeWidth={2.5} />
            </button>

            {/* Swipeable pictures */}
            <div className="mx-[0.8rem] pt-[0.9rem]">
              <ProjectGallery
                key={active.id}
                images={active.images}
                title={active.title[lang]}
                type={active.imageType}
                isRtl={lang === 'ur'}
              />
            </div>

            <div className="px-6 sm:px-10">
              <div className="mt-8">
                <span className="heading-marker text-[0.9rem]">{active.category}</span>
              </div>

              <h3 className={`mt-3 ${popupHeading}`}>{active.title[lang]}</h3>

              <p className="mt-4 text-navy">{active.description[lang]}</p>

              <h4 className={`mt-10 ${popupHeading}`}>
                {lang === 'en' ? 'Tech stack:' : 'ٹیک اسٹیک:'}
              </h4>

              <div className="mt-4">
                {(['frontend', 'backend'] as const).map(
                  (key) =>
                    active.stack[key].length > 0 && (
                      <p key={key}>
                        <span className="font-semibold text-foreground">{stackLabels[key]}</span>{' '}
                        <span className="text-navy">{active.stack[key].join(', ')}</span>
                      </p>
                    )
                )}
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                {active.liveUrl && (
                  <a href={active.liveUrl} target="_blank" rel="noreferrer" className={outlineButton}>
                    {dict.common.liveDemo}
                  </a>
                )}
                <a href={active.githubUrl} target="_blank" rel="noreferrer" className={outlineButton}>
                  {dict.common.sourceCode}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}