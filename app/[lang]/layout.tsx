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
  params: Promise<{ lang: string }>;
}

export default async function LocalizedLayout({ children, params }: LayoutProps) {
  const resolvedParams = await params;
  const lang = (resolvedParams.lang === 'ur' ? 'ur' : 'en') as Locale;
  const dict = dictionaries[lang] || dictionaries.en;
  const isRtl = lang === 'ur';

  return (
    // Outer blue frame (40px at the reference size)
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className="h-dvh overflow-hidden bg-frame p-5 lg:p-10 transition-colors"
    >
      {/* Inner white card (40px side padding at the reference size) */}
      <div className="h-full flex flex-col bg-background text-foreground px-9 sm:px-8 lg:px-10 transition-colors">
        <Navbar dict={dict} lang={lang} />
        <main className="flex-1 min-h-0 overflow-y-auto no-scrollbar">{children}</main>
        <Footer />
      </div>
    </div>
  );
}