import { Project } from "@/types/project";

const entries: { en: Project[]; bn: Project[] } = {
  en: [
    {
      slug: "pregnancy-tracker",
      group: "featured",
      title: "Pregnancy Tracker",
      description:
        "A calm pregnancy companion. Track progress, symptoms, weight changes and other health notes across the whole journey, all in one place.",
      tech: ["Next.js", "JavaScript", "CSS"],
      github: "https://github.com/mdraselswe/pregnancy-tracker",
      demo: "https://pregnancy.mdrasel.site",
    },
    {
      slug: "lifetrack",
      group: "featured",
      title: "LifeTrack",
      description:
        "Reminders and debts, finally in one installable app. It works offline, syncs in real time with Firebase, and speaks Bangla.",
      tech: ["Next.js", "TypeScript", "Firebase", "PWA"],
      github: "https://github.com/mdraselswe/lifetrack",
      demo: "https://lifetrack.mdrasel.site",
    },
    {
      slug: "husnul-dua",
      group: "featured",
      title: "Husnul Dua",
      description:
        "Duas, amals and zikr for everyday life, searchable and quick to read on any phone.",
      tech: ["Next.js", "JavaScript", "CSS"],
      github: "https://github.com/mdraselswe/husnul-dua",
      demo: "https://dua.mdrasel.site",
    },
    {
      slug: "bloodreach",
      group: "more",
      title: "BloodReach",
      description: "Find nearby verified blood donors fast, when every minute counts.",
      tech: ["Next.js", "JavaScript", "CSS"],
      github: "https://github.com/mdraselswe/blood-reach",
      demo: "https://blood-reach.vercel.app",
    },
    {
      slug: "shikho-shop",
      group: "platform",
      title: "Shikho Shop - E-commerce Platform",
      description:
        "Shikho's online store for educational resources. I lead its frontend, built with Next.js, TypeScript and GraphQL.",
      tech: ["Next.js", "TypeScript", "GraphQL", "Tailwind CSS"],
      demo: "https://shop.shikho.com",
    },
    {
      slug: "bohubrihi",
      group: "platform",
      title: "Bohubrihi - Learning Platform",
      description:
        "One of Bangladesh's leading skill-learning platforms. Interactive courses and progress tracking, on Next.js and GraphQL.",
      tech: ["Next.js", "TypeScript", "GraphQL", "Tailwind CSS"],
      demo: "https://bohubrihi.com",
    },
    {
      slug: "nextdhabian",
      group: "platform",
      title: "NextDhabian & NextBuetian",
      description:
        "Two learning platforms tailored for university students, with targeted content and resources for each audience.",
      tech: ["Next.js", "TypeScript", "GraphQL", "Tailwind CSS"],
      demos: {
        nextdhabian: "https://nextdhabian.shikho.com",
        nextbuetian: "https://nextbuetian.shikho.com",
      },
    },
    {
      slug: "modern-responsive",
      group: "earlier",
      title: "Modern Responsive Website",
      description: "A study in responsive layout and clean visual design.",
      tech: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
      github: "https://github.com/mdraselswe/Modern-Responsive-Website",
      demo: "https://mdraselswe.github.io/Modern-Responsive-Website",
    },
    {
      slug: "natours-tour",
      group: "earlier",
      title: "Natours Tour",
      description: "A tour booking site that pushes advanced CSS and SASS.",
      tech: ["HTML5", "SASS", "CSS Animations", "Responsive Design"],
      github: "https://github.com/mdraselswe/Natours-Tour",
      demo: "https://mdraselswe.github.io/Natours-Tour",
    },
    {
      slug: "greensock",
      group: "earlier",
      title: "GreenSock Animations",
      description: "Interactive web animations built with GSAP.",
      tech: ["JavaScript", "GSAP", "HTML5", "CSS3"],
      github: "https://github.com/mdraselswe/GreenSock",
      demo: "https://mdraselswe.github.io/GreenSock/",
    },
    {
      slug: "money-management",
      group: "earlier",
      title: "Money Management App",
      description: "A React Native app for tracking expenses and managing budgets.",
      tech: ["React Native", "Redux", "Node.js", "MongoDB"],
      github: "https://github.com/mdraselswe/money-management-app",
    },
    {
      slug: "crown-clothing",
      group: "earlier",
      title: "Crown Clothing",
      description: "A fashion e-commerce store with a modern shopping flow.",
      tech: ["React", "Redux", "Firebase", "Styled Components"],
      github: "https://github.com/mdraselswe/crwn-clothing",
    },
    {
      slug: "gedushop",
      group: "featured",
      title: "GeduShop",
      description:
        "A headless storefront for an online toy shop, built for speed: 20 responsive routes, 69 reusable components, Lighthouse performance lifted from 72 to 95, and releases cut from about 15 minutes to under 2.",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "Cloudflare Pages", "WooCommerce"],
      github: "https://github.com/mdraselswe/gedushop-frontend",
      demo: "https://gedushop.com",
    },
    {
      slug: "cleancv",
      group: "featured",
      title: "CleanCV",
      description:
        "A CV builder that gets past applicant tracking systems. 10 templates, a live score against 31 parsing rules, and PDFs with a real text layer, backed by 390+ automated tests.",
      tech: ["Next.js", "TypeScript", "Zustand", "Drizzle", "Puppeteer"],
      github: "https://github.com/mdraselswe/cleancv",
      demo: "https://cv.mdrasel.site",
    },
    {
      slug: "portfolio",
      group: "more",
      title: "Portfolio",
      description:
        "This site: server-rendered in English and Bangla, 100 in Lighthouse for accessibility, best practices and SEO, and guarded by Playwright and axe tests.",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "Playwright"],
      github: "https://github.com/mdraselswe/portfolio",
      demo: "https://mdrasel.site",
    },
    {
      slug: "gedusuite",
      group: "more",
      title: "GeduSuite",
      description:
        "A multi-tenant ERP and PWA for small online shops: 45+ pages and 60+ data models covering procurement, courier reconciliation and roles. It replaced three spreadsheets with one ledger and saves about 10 hours a week.",
      tech: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "PWA"],
      github: "https://github.com/mdraselswe/gedusuite",
      demo: "https://app.gedushop.com",
    },
    {
      slug: "jelar-shad",
      group: "featured",
      title: "Jelar Shad",
      description:
        "Where should you eat in each district? A community food guide for Bangladesh: someone adds a dish, others confirm or correct it. Bangla-first and installable.",
      tech: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "PWA"],
      github: "https://github.com/mdraselswe/jelarshad",
      demo: "https://jelarshad.shojashapta.com",
    },
    {
      slug: "jajabor-meter",
      group: "more",
      title: "Jajabor Meter",
      description:
        "Real nomad or couch king? Tap the districts you've visited on a map of all 64, answer quirky quizzes and share a roast certificate. No login needed.",
      tech: ["Next.js", "TypeScript", "Framer Motion", "Firebase"],
      github: "https://github.com/mdraselswe/jajabor-meter",
      demo: "https://jajabor.mdrasel.site",
    },
  ],
  bn: [
    {
      slug: "pregnancy-tracker",
      group: "featured",
      title: "প্রেগন্যান্সি ট্র্যাকার",
      description:
        "গর্ভকালীন পুরো সময়ের সঙ্গী। অগ্রগতি, শারীরিক লক্ষণ, ওজনের পরিবর্তন আর স্বাস্থ্য-সংক্রান্ত নোট, সবকিছু এক জায়গায় লিখে রাখুন।",
      tech: ["Next.js", "JavaScript", "CSS"],
      github: "https://github.com/mdraselswe/pregnancy-tracker",
      demo: "https://pregnancy.mdrasel.site",
    },
    {
      slug: "lifetrack",
      group: "featured",
      title: "লাইফট্র্যাক",
      description:
        "রিমাইন্ডার আর ধার-দেনার হিসাব এক অ্যাপে। ফোনে ইনস্টল করা যায়, অফলাইনেও চলে, Firebase-এ রিয়েল-টাইমে সিঙ্ক হয়, আর পুরোটা বাংলায় ব্যবহার করা যায়।",
      tech: ["Next.js", "TypeScript", "Firebase", "PWA"],
      github: "https://github.com/mdraselswe/lifetrack",
      demo: "https://lifetrack.mdrasel.site",
    },
    {
      slug: "husnul-dua",
      group: "featured",
      title: "হুসনুল দুআ",
      description:
        "দৈনন্দিন জীবনের দুআ, আমল ও জিকির এক জায়গায়। সহজে খুঁজে নিন, ফোনেই আরাম করে পড়ুন।",
      tech: ["Next.js", "JavaScript", "CSS"],
      github: "https://github.com/mdraselswe/husnul-dua",
      demo: "https://dua.mdrasel.site",
    },
    {
      slug: "bloodreach",
      group: "more",
      title: "ব্লাডরিচ",
      description:
        "জরুরি মুহূর্তে কাছের যাচাই-করা রক্তদাতা দ্রুত খুঁজে পান। এখানে প্রতিটি মিনিটই গুরুত্বপূর্ণ।",
      tech: ["Next.js", "JavaScript", "CSS"],
      github: "https://github.com/mdraselswe/blood-reach",
      demo: "https://blood-reach.vercel.app",
    },
    {
      slug: "shikho-shop",
      group: "platform",
      title: "শিখো শপ - ই-কমার্স প্ল্যাটফর্ম",
      description:
        "শিখোর অনলাইন স্টোর, যেখানে শিক্ষামূলক রিসোর্স কেনা যায়। এর ফ্রন্টএন্ডে নেতৃত্ব দিই। Next.js, TypeScript ও GraphQL দিয়ে তৈরি।",
      tech: ["Next.js", "TypeScript", "GraphQL", "Tailwind CSS"],
      demo: "https://shop.shikho.com",
    },
    {
      slug: "bohubrihi",
      group: "platform",
      title: "বহুব্রীহি - লার্নিং প্ল্যাটফর্ম",
      description:
        "বাংলাদেশের অন্যতম শীর্ষ স্কিল-লার্নিং প্ল্যাটফর্ম। Next.js ও GraphQL-এ তৈরি, ইন্টারেক্টিভ কোর্স আর অগ্রগতি ট্র্যাকিং সহ।",
      tech: ["Next.js", "TypeScript", "GraphQL", "Tailwind CSS"],
      demo: "https://bohubrihi.com",
    },
    {
      slug: "nextdhabian",
      group: "platform",
      title: "নেক্সটঢাবিয়ান এবং নেক্সটবুয়েটিয়ান",
      description:
        "বিশ্ববিদ্যালয়ের শিক্ষার্থীদের জন্য আলাদা করে সাজানো দুটি লার্নিং প্ল্যাটফর্ম, প্রতিটিতে নিজস্ব কনটেন্ট ও রিসোর্স।",
      tech: ["Next.js", "TypeScript", "GraphQL", "Tailwind CSS"],
      demos: {
        nextdhabian: "https://nextdhabian.shikho.com",
        nextbuetian: "https://nextbuetian.shikho.com",
      },
    },
    {
      slug: "modern-responsive",
      group: "earlier",
      title: "আধুনিক রেসপনসিভ ওয়েবসাইট",
      description: "রেসপনসিভ লেআউট আর পরিচ্ছন্ন ডিজাইনের একটি চর্চা।",
      tech: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
      github: "https://github.com/mdraselswe/Modern-Responsive-Website",
      demo: "https://mdraselswe.github.io/Modern-Responsive-Website",
    },
    {
      slug: "natours-tour",
      group: "earlier",
      title: "নাটোর্স টুর",
      description: "উন্নত CSS ও SASS-এর কারিগরি দেখানো একটি ট্যুর বুকিং সাইট।",
      tech: ["HTML5", "SASS", "CSS Animations", "Responsive Design"],
      github: "https://github.com/mdraselswe/Natours-Tour",
      demo: "https://mdraselswe.github.io/Natours-Tour",
    },
    {
      slug: "greensock",
      group: "earlier",
      title: "গ্রীনসক অ্যানিমেশন",
      description: "GSAP দিয়ে বানানো ইন্টারেক্টিভ ওয়েব অ্যানিমেশন।",
      tech: ["JavaScript", "GSAP", "HTML5", "CSS3"],
      github: "https://github.com/mdraselswe/GreenSock",
      demo: "https://mdraselswe.github.io/GreenSock/",
    },
    {
      slug: "money-management",
      group: "earlier",
      title: "মানি ম্যানেজমেন্ট অ্যাপ",
      description: "খরচ ট্র্যাক করা ও বাজেট সামলানোর জন্য একটি React Native অ্যাপ।",
      tech: ["React Native", "Redux", "Node.js", "MongoDB"],
      github: "https://github.com/mdraselswe/money-management-app",
    },
    {
      slug: "crown-clothing",
      group: "earlier",
      title: "ক্রাউন ক্লোদিং",
      description: "আধুনিক শপিং অভিজ্ঞতার একটি ফ্যাশন ই-কমার্স স্টোর।",
      tech: ["React", "Redux", "Firebase", "Styled Components"],
      github: "https://github.com/mdraselswe/crwn-clothing",
    },
    {
      slug: "gedushop",
      group: "featured",
      title: "গেডুশপ",
      description:
        "খেলনা ও শিশুদের পণ্যের অনলাইন শপের জন্য দ্রুতগতির হেডলেস স্টোরফ্রন্ট: ২০টি রেসপনসিভ রুট, ৬৯টি রিইউজেবল কম্পোনেন্ট, Lighthouse পারফরম্যান্স ৭২ থেকে ৯৫, আর রিলিজের সময় ১৫ মিনিট থেকে ২ মিনিটের নিচে।",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "Cloudflare Pages", "WooCommerce"],
      github: "https://github.com/mdraselswe/gedushop-frontend",
      demo: "https://gedushop.com",
    },
    {
      slug: "cleancv",
      group: "featured",
      title: "ক্লিনসিভি",
      description:
        "যে সিভি অ্যাপ্লিক্যান্ট ট্র্যাকিং সিস্টেম পার করে যায়। ১০টি টেমপ্লেট, ৩১টি পার্সিং রুলের বিপরীতে লাইভ স্কোর, আর আসল টেক্সট লেয়ারসহ PDF। ৩৯০টির বেশি অটোমেটেড টেস্টে যাচাই করা।",
      tech: ["Next.js", "TypeScript", "Zustand", "Drizzle", "Puppeteer"],
      github: "https://github.com/mdraselswe/cleancv",
      demo: "https://cv.mdrasel.site",
    },
    {
      slug: "portfolio",
      group: "more",
      title: "পোর্টফোলিও",
      description:
        "এই সাইটটিই। ইংরেজি ও বাংলা দুই ভাষায় সার্ভার-রেন্ডার করা, Lighthouse-এ অ্যাক্সেসিবিলিটি, বেস্ট প্র্যাকটিস ও SEO-তে ১০০, আর Playwright ও axe টেস্টে সুরক্ষিত।",
      tech: ["Next.js", "TypeScript", "Tailwind CSS", "Playwright"],
      github: "https://github.com/mdraselswe/portfolio",
      demo: "https://mdrasel.site",
    },
    {
      slug: "gedusuite",
      group: "more",
      title: "গেডুসুইট",
      description:
        "ছোট অনলাইন শপের জন্য মাল্টি-টেন্যান্ট ERP ও PWA: ৪৫+ পেজ, ৬০+ ডেটা মডেল, ক্রয়, কুরিয়ার রিকনসিলিয়েশন ও ভূমিকাভিত্তিক অ্যাক্সেস সহ। তিনটি স্প্রেডশিটের জায়গায় এখন একটি লেজার, সপ্তাহে প্রায় ১০ ঘণ্টা সাশ্রয়।",
      tech: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "PWA"],
      github: "https://github.com/mdraselswe/gedusuite",
      demo: "https://app.gedushop.com",
    },
    {
      slug: "jelar-shad",
      group: "featured",
      title: "জেলার স্বাদ",
      description:
        "কোন জেলায় কী খাবেন? বাংলাদেশের কমিউনিটি-ভিত্তিক খাবারের গাইড: কেউ একটি খাবার যোগ করেন, অন্যরা নিশ্চিত করেন বা শুধরে দেন। বাংলা-প্রথম, ফোনে ইনস্টলও করা যায়।",
      tech: ["Next.js", "TypeScript", "Supabase", "Tailwind CSS", "PWA"],
      github: "https://github.com/mdraselswe/jelarshad",
      demo: "https://jelarshad.shojashapta.com",
    },
    {
      slug: "jajabor-meter",
      group: "more",
      title: "যাযাবর মিটার",
      description:
        "আপনি কি আসল যাযাবর, নাকি খাটের রাজা? ৬৪ জেলার ম্যাপে ঘুরে আসা জেলাগুলো ট্যাপ করুন, মজার কুইজে অংশ নিন, আর রোস্টিং সনদ বন্ধুদের সাথে শেয়ার করুন। লগইন লাগে না।",
      tech: ["Next.js", "TypeScript", "Framer Motion", "Firebase"],
      github: "https://github.com/mdraselswe/jajabor-meter",
      demo: "https://jajabor.mdrasel.site",
    },
  ],
};

/** Display order within each group (a group filters by `project.group`). */
const ORDER = [
  "pregnancy-tracker",
  "lifetrack",
  "jelar-shad",
  "gedushop",
  "cleancv",
  "husnul-dua",
  "shikho-shop",
  "bohubrihi",
  "nextdhabian",
  "gedusuite",
  "portfolio",
  "jajabor-meter",
  "bloodreach",
  "modern-responsive",
  "natours-tour",
  "greensock",
  "money-management",
  "crown-clothing",
];

const sorted = (list: Project[]) =>
  [...list].sort((a, b) => ORDER.indexOf(a.slug) - ORDER.indexOf(b.slug));

export const projects: { en: Project[]; bn: Project[] } = {
  en: sorted(entries.en),
  bn: sorted(entries.bn),
};

export const projectsInGroup = (lang: "en" | "bn", group: Project["group"]) =>
  projects[lang].filter((p) => p.group === group);
