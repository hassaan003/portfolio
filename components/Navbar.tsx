'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { Sun, Moon, Globe, Menu, X } from 'lucide-react';
import { Dictionary } from '@/locales/en';
import { Locale } from '@/types';
import Image from 'next/image';


interface NavbarProps {
  dict: Dictionary;
  lang: Locale;
}

const softButton =
  'inline-flex items-center justify-center hover:bg-black/5 dark:hover:bg-white/10 transition-colors';

export default function Navbar({ dict, lang }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const pathname = usePathname();

  // Switch language but stay on the same page
  const toggleLocale = lang === 'en' ? 'ur' : 'en';
  const newPathname = `/${toggleLocale}${pathname.slice(lang.length + 1)}`;

  const links = [
    { href: `/${lang}/resume`, label: dict.nav.resume },
    { href: `/${lang}/projects`, label: dict.nav.projects },
  ];

  const linkClass = 'text-foreground hover:text-brand transition-colors';

  return (
    // header
    <header className="relative flex items-center justify-between pt-5 sm:pt-4 lg:pt-10 lg:pe-2 lg:ms-6">
      {/* Logo */}
      <Link
        href={`/${lang}`}
        aria-label="Home"
        // logo
        className="inline-flex items-center hover:opacity-80 transition-opacity">
        <Image
          src="/logo.png"
          alt="Hassaan Ahmed Logo"
          width={64}
          height={32}
          priority
          className="h-17 sm:h-20 w-auto dark:invert"
        />
      </Link>

      <div className="flex items-center gap-2 md:gap-8 lg:gap-[3.25rem]">
        <div className="flex items-center gap-6 sm:gap-12">
          {/* Theme */}
          <button
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            className={`${softButton} size-10`}
            aria-label="Toggle theme"
          >
            <Sun className="size-6 hidden dark:block" />
            <Moon className="size-6 block dark:hidden" />
          </button>

          {/* Language */}
          <Link href={newPathname} className={`${softButton} h-10 gap-1.5 px-2.5`}>
            <Globe className="size-6" />
            <span>{lang === 'en' ? 'اردو' : 'EN'}</span>
          </Link>
        </div>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-[4.25rem]">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className={linkClass}>
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Menu button (mobile) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`${softButton} md:hidden size-10`}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden absolute inset-x-0 top-full z-20 flex flex-col border border-line bg-background px-4 py-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`py-3 ${linkClass}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}