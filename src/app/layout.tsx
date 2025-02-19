import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Loading from "@/components/atoms/Loading";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Muhammad Rasel | Senior Frontend Developer",
  description:
    "Senior Frontend Developer with over 7 years of expertise in React.js, Next.js, and Team Leadership. Explore my portfolio showcasing modern web development projects.",
  keywords: [
    "Muhammad Rasel",
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "Web Development",
    "UI/UX",
    "JavaScript",
    "TypeScript",
    "Portfolio",
  ],
  authors: [{ name: "Muhammad Rasel" }],
  creator: "Muhammad Rasel",
  publisher: "Muhammad Rasel",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mdraselswe.github.io",
    siteName: "Muhammad Rasel Portfolio",
    title: "Muhammad Rasel | Senior Frontend Developer",
    description:
      "Senior Frontend Developer with over 7 years of expertise in React.js, Next.js, and Team Leadership",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Rasel | Senior Frontend Developer",
    description:
      "Senior Frontend Developer with over 7 years of expertise in React.js, Next.js, and Team Leadership",
    creator: "@mdraselswe",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <Loading />
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
