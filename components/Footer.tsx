'use client';

import { useState, useEffect } from 'react';
import { Mail } from 'lucide-react';

// TODO: put your real LinkedIn link and email here
const GITHUB_URL = 'https://github.com/hassaan003';
const LINKEDIN_URL = 'https://www.linkedin.com/in/-hassaan-ahmed-/';
const EMAIL = 'mailto:hassaankhawaja07@gmail.com';

function GithubIcon() {
  return (
    <svg className="size-[1.15rem]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg className="size-[1.15rem]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function Footer() {
  const [currentYear, setCurrentYear] = useState<number>(2026);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const iconClass = 'text-foreground hover:text-brand transition-colors';

  return (
    <footer className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 pt-4 pb-5 sm:pb-4 lg:pb-[2.2rem] text-[0.9rem] text-muted">      <p>© {currentYear} Hassaan Ahmed. All rights reserved.</p>

      {/* Icons: ~18px with ~18px between them */}
      <div className="flex items-center gap-[1.1rem]">
        <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" aria-label="LinkedIn" className={iconClass}>
          <LinkedinIcon />
        </a>
        <a href={GITHUB_URL} target="_blank" rel="noreferrer" aria-label="GitHub" className={iconClass}>
          <GithubIcon />
        </a>
        <a href={EMAIL} aria-label="Email" className={iconClass}>
          <Mail className="size-[1.15rem]" />
        </a>
      </div>
    </footer>
  );
}