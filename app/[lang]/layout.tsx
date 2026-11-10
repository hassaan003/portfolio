// app/[lang]/layout.tsx
import { ReactNode } from 'react';
import { en } from '@/locales/en';
import { ur } from '@/locales/ur';
import { Locale } from '@/types';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const dictionaries = { en, ur };

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'ur' }];
}

interface LayoutProps {
  children: ReactNode;
  params: Promise<{ lang: Locale }>;
}

export default async function LocalizedLayout({ children, params }: LayoutProps) {
  const { lang } = await params;
  const dict = dictionaries[lang] || dictionaries.en;
  const isRtl = lang === 'ur';

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
      <Navbar dict={dict} lang={lang} />
      <main className="flex-grow">{children}</main>
      <Footer lang={lang} />
    </div>
  );
}