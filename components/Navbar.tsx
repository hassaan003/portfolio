// components/Navbar.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Sun, Moon, Globe, Menu, X } from 'lucide-react';
import { Dictionary } from '@/locales/en';
import { Locale } from '@/types';

interface NavbarProps {
  dict: Dictionary;
  lang: Locale;
}

export default function Navbar({ dict, lang }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  // Helper to switch languages while maintaining the current page path
  const toggleLocale = lang === 'en' ? 'ur' : 'en';
  const newPathname = pathname.replace(`/${lang}`, `/${toggleLocale}`);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link href={`/${lang}`} className="font-bold text-xl tracking-tight text-gray-900 dark:text-white">
          Hassaan<span className="text-indigo-600">.dev</span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
          <Link href={`/${lang}#about`} className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 transition-colors">
            {dict.nav.about}
          </Link>
          <Link href={`/${lang}#projects`} className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 transition-colors">
            {dict.nav.projects}
          </Link>
          <Link href={`/${lang}#experience`} className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 transition-colors">
            {dict.nav.experience}
          </Link>
          <Link href={`/${lang}#contact`} className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 transition-colors">
            {dict.nav.contact}
          </Link>
        </nav>

        {/* Controls: Language & Theme Toggle */}
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          {/* Language Switcher */}
          <Link
            href={newPathname}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <Globe className="w-4 h-4" />
            <span>{lang === 'en' ? 'اردو' : 'English'}</span>
          </Link>

          {/* Theme Toggle Button */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle theme"
          >
            <Sun className="w-5 h-5 hidden dark:block" />
            <Moon className="w-5 h-5 block dark:hidden" />
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 pt-2 pb-4 space-y-2">
          <Link
            href={`/${lang}#about`}
            onClick={() => setIsOpen(false)}
            className="block py-2 text-gray-600 dark:text-gray-300"
          >
            {dict.nav.about}
          </Link>
          <Link
            href={`/${lang}#projects`}
            onClick={() => setIsOpen(false)}
            className="block py-2 text-gray-600 dark:text-gray-300"
          >
            {dict.nav.projects}
          </Link>
          <Link
            href={`/${lang}#experience`}
            onClick={() => setIsOpen(false)}
            className="block py-2 text-gray-600 dark:text-gray-300"
          >
            {dict.nav.experience}
          </Link>
          <Link
            href={`/${lang}#contact`}
            onClick={() => setIsOpen(false)}
            className="block py-2 text-gray-600 dark:text-gray-300"
          >
            {dict.nav.contact}
          </Link>
        </div>
      )}
    </header>
  );
}