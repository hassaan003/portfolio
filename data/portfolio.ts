import { Project, Experience } from "@/types";

export const projects: Project[] = [
  {
    id: "wholesale-catalog",
    title: {
      en: "Wholesale E-Commerce Catalog & Admin Panel",
      ur: "ہول سیل ای کامرس کیٹلاگ اور ایڈمن پینل",
    },
    description: {
      en: "Built a public wholesale e-commerce catalog and custom administrative dashboard from scratch, featuring role-based access control and real-time inventory management.",
      ur: "ایک عوامی ہول سیل ای کامرس کیٹلاگ اور کسٹم ایڈمنسٹ্রেٹو ڈیش بورڈ مکمل طور پر تیار کیا، جس میں رول پر مبنی رسہ کنٹرول شامل ہے۔",
    },
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    image: "/images/project-placeholder.jpg",
  },
  // You can easily add more projects here following the same structure!
];

export const experiences: Experience[] = [
  {
    id: "skyline-outlet",
    role: {
      en: "Full-Stack Developer",
      ur: "فل اسٹیک ڈویلپر",
    },
    company: "Skyline Outlet LLC",
    period: "May 2026 - Present",
    highlights: [
      {
        en: "Developing public wholesale catalogs and custom admin panels from scratch.",
        ur: "عوامی ہول سیل کیٹلاگ اور کسٹم ایڈمن پینل کی تیاری پر کام جاری ہے۔",
      },
      {
        en: "Optimizing database queries and implementing secure authentication workflows.",
        ur: "ڈیٹا بیس کیوریز کو بہتر بنانا اور محفوظ تصدیقی ورک فلو لاگو کرنا۔",
      },
    ],
  },
];