import type { Language } from "@/types/context";

export interface Role {
  id: string;
  title: string;
  company: string;
  period: string;
  place: string;
  about: string;
  points: string[];
  tags: string[];
}

export interface Degree {
  degree: string;
  school: string;
  period: string;
  place: string;
  grade: string;
}

/** Everything here comes from the CV. Company and tool names stay in Latin script in Bangla. */
export const experience: Record<Language, Role[]> = {
  en: [
    {
      id: "shikho",
      title: "Senior Software Engineer",
      company: "Shikho Technologies Bangladesh Ltd",
      period: "Dec 2022 – Present",
      place: "Banani, Dhaka",
      about:
        "A technology company focused on enhancing learning experiences through digital platforms.",
      points: [
        "Led frontend development of Shikho Shop and other customer-facing platforms serving 3M+ students and 4.5M+ app downloads, using Next.js, TypeScript and GraphQL.",
        "Created a reusable component library adopted across 4 latest products, making new UI delivery 10x faster and standardizing frontend patterns.",
        "Integrated 2 third-party services (Grameenphone, Ami Probashi) and AI/LLM-powered workflows across production applications, working with product, design and engineering teams.",
        "Mentored 3+ frontend engineers through code reviews, technical guidance and Agile practices.",
      ],
      tags: ["Next.js", "TypeScript", "GraphQL", "LLM APIs"],
    },
    {
      id: "gdh",
      title: "Front End Engineer",
      company: "Grameen Digital Health (Ex Telenor)",
      period: "Nov 2020 – Nov 2022",
      place: "Bashundhara, Dhaka",
      about:
        "A digital health service aimed at improving healthcare accessibility through technology.",
      points: [
        "Enhanced 28 core web components for digital health products, with responsive and consistent experiences across mobile and desktop.",
        "Migrated complex application state to the React Context API, cutting redundant re-renders by 85%+ and simplifying state management.",
        "Added automated static code analysis to the workflow, reducing production bugs 10x versus before.",
      ],
      tags: ["React", "Context API", "Static analysis"],
    },
    {
      id: "shohoz",
      title: "Software Engineer",
      company: "Shohoz Ltd.",
      period: "Aug 2019 – Oct 2020",
      place: "Banani, Dhaka",
      about: "A platform providing on-demand food, ticket and transportation services.",
      points: [
        "Developed core features for Shohoz Food Web with reusable React components, serving 1,000+ partner restaurants across Dhaka and select cities.",
        "Standardized developer documentation with Storybook, documenting 40+ reusable components and speeding up onboarding.",
      ],
      tags: ["React", "Storybook"],
    },
    {
      id: "shimahin",
      title: "Software Engineer",
      company: "Shimahin Limited",
      period: "Apr 2018 – Jul 2019",
      place: "Banani, Dhaka",
      about: "A company providing web development and design services.",
      points: [
        "Improved cross-browser compatibility with multi-platform testing and custom CSS/JavaScript polyfills, supporting 4+ major browsers including legacy versions.",
        "Designed a scalable UI library of 25 reusable React components used by 3 projects, establishing a shared frontend pattern.",
      ],
      tags: ["React", "CSS", "Polyfills"],
    },
  ],
  bn: [
    {
      id: "shikho",
      title: "সিনিয়র সফটওয়্যার ইঞ্জিনিয়ার",
      company: "Shikho Technologies Bangladesh Ltd",
      period: "ডিসেম্বর ২০২২ – বর্তমান",
      place: "বনানী, ঢাকা",
      about:
        "ডিজিটাল প্ল্যাটফর্মের মাধ্যমে শেখার অভিজ্ঞতা উন্নত করার কাজে নিয়োজিত একটি প্রযুক্তি প্রতিষ্ঠান।",
      points: [
        "Next.js, TypeScript ও GraphQL দিয়ে শিখো শপ এবং ৩M+ শিক্ষার্থী ও ৪.৫M+ অ্যাপ ডাউনলোডের আরও কয়েকটি গ্রাহকমুখী প্ল্যাটফর্মের ফ্রন্টএন্ড ডেভেলপমেন্টে নেতৃত্ব দিয়েছি।",
        "একটি রিইউজেবল কম্পোনেন্ট লাইব্রেরি বানিয়েছি, যা সর্বশেষ ৪টি প্রোডাক্টে ব্যবহৃত হচ্ছে। এতে নতুন UI ডেলিভারি ১০ গুণ দ্রুত হয়েছে এবং ফ্রন্টএন্ডের প্যাটার্ন একরকম হয়েছে।",
        "প্রোডাকশন অ্যাপে ২টি থার্ড-পার্টি সার্ভিস (Grameenphone, Ami Probashi) এবং AI/LLM-চালিত ওয়ার্কফ্লো যুক্ত করেছি, প্রোডাক্ট, ডিজাইন ও ইঞ্জিনিয়ারিং টিমের সাথে কাজ করে।",
        "কোড রিভিউ, টেকনিক্যাল গাইডেন্স ও Agile চর্চার মাধ্যমে ৩+ ফ্রন্টএন্ড ইঞ্জিনিয়ারকে মেন্টর করেছি।",
      ],
      tags: ["Next.js", "TypeScript", "GraphQL", "LLM APIs"],
    },
    {
      id: "gdh",
      title: "ফ্রন্টএন্ড ইঞ্জিনিয়ার",
      company: "Grameen Digital Health (Ex Telenor)",
      period: "নভেম্বর ২০২০ – নভেম্বর ২০২২",
      place: "বসুন্ধরা, ঢাকা",
      about:
        "প্রযুক্তির মাধ্যমে স্বাস্থ্যসেবা সবার কাছে পৌঁছে দেওয়ার লক্ষ্যে একটি ডিজিটাল হেলথ সার্ভিস।",
      points: [
        "ডিজিটাল হেলথ প্রোডাক্টের ২৮টি মূল ওয়েব কম্পোনেন্ট উন্নত করেছি, ফলে মোবাইল ও ডেস্কটপে অভিজ্ঞতা রেসপনসিভ ও সামঞ্জস্যপূর্ণ হয়েছে।",
        "জটিল অ্যাপ স্টেট React Context API-তে সরিয়ে অপ্রয়োজনীয় রি-রেন্ডার ৮৫%+ কমিয়েছি এবং স্টেট ম্যানেজমেন্ট সহজ করেছি।",
        "ওয়ার্কফ্লোতে স্বয়ংক্রিয় স্ট্যাটিক কোড অ্যানালাইসিস যুক্ত করে আগের তুলনায় প্রোডাকশন বাগ ১০ গুণ কমিয়েছি।",
      ],
      tags: ["React", "Context API", "Static analysis"],
    },
    {
      id: "shohoz",
      title: "সফটওয়্যার ইঞ্জিনিয়ার",
      company: "Shohoz Ltd.",
      period: "আগস্ট ২০১৯ – অক্টোবর ২০২০",
      place: "বনানী, ঢাকা",
      about: "অন-ডিমান্ড খাবার, টিকিট ও পরিবহন সেবার একটি প্ল্যাটফর্ম।",
      points: [
        "রিইউজেবল React কম্পোনেন্ট দিয়ে Shohoz Food Web-এর মূল ফিচার বানিয়েছি, যা ঢাকা ও কয়েকটি শহরের ১,০০০+ পার্টনার রেস্টুরেন্টকে সেবা দেয়।",
        "Storybook দিয়ে ডেভেলপার ডকুমেন্টেশন একরকম করেছি, ৪০+ রিইউজেবল কম্পোনেন্ট ডকুমেন্ট করে নতুনদের অনবোর্ডিং দ্রুত করেছি।",
      ],
      tags: ["React", "Storybook"],
    },
    {
      id: "shimahin",
      title: "সফটওয়্যার ইঞ্জিনিয়ার",
      company: "Shimahin Limited",
      period: "এপ্রিল ২০১৮ – জুলাই ২০১৯",
      place: "বনানী, ঢাকা",
      about: "ওয়েব ডেভেলপমেন্ট ও ডিজাইন সেবা দেওয়া একটি প্রতিষ্ঠান।",
      points: [
        "মাল্টি-প্ল্যাটফর্ম টেস্টিং ও কাস্টম CSS/JavaScript পলিফিল দিয়ে ক্রস-ব্রাউজার সামঞ্জস্য উন্নত করেছি, পুরোনো ভার্সনসহ ৪+ প্রধান ব্রাউজার সাপোর্ট করেছে।",
        "২৫টি রিইউজেবল React কম্পোনেন্টের একটি স্কেলেবল UI লাইব্রেরি ডিজাইন করেছি, যা ৩টি প্রজেক্টে ব্যবহৃত হয়েছে এবং শেয়ার্ড ফ্রন্টএন্ড প্যাটার্ন দাঁড় করিয়েছে।",
      ],
      tags: ["React", "CSS", "Polyfills"],
    },
  ],
};

export const education: Record<Language, Degree> = {
  en: {
    degree: "B.Sc. in Software Engineering",
    school: "Daffodil International University (DIU)",
    period: "Apr 2014 – Jan 2018",
    place: "Dhanmondi, Dhaka",
    grade: "CGPA 3.20 / 4.00",
  },
  bn: {
    degree: "বি.এসসি. ইন সফটওয়্যার ইঞ্জিনিয়ারিং",
    school: "ড্যাফোডিল ইন্টারন্যাশনাল ইউনিভার্সিটি (DIU)",
    period: "এপ্রিল ২০১৪ – জানুয়ারি ২০১৮",
    place: "ধানমন্ডি, ঢাকা",
    grade: "সিজিপিএ ৩.২০ / ৪.০০",
  },
};
