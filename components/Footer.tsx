// components/Footer.tsx
import { Locale } from '@/types';

interface FooterProps {
  lang: Locale;
}

export default function Footer({ lang }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 py-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          © {currentYear} Hassaan Ahmed. All rights reserved.
        </p>
        <div className="flex space-x-6 text-sm text-gray-500 dark:text-gray-400">
          <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-indigo-600 transition-colors">
            GitHub
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-indigo-600 transition-colors">
            LinkedIn
          </a>
          <a href="mailto:contact@example.com" className="hover:text-indigo-600 transition-colors">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}