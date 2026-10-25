/** @type {import('next').NextConfig} */
const nextConfig = {
  // Lets a production build run beside a live dev server (e.g. for e2e checks).
  distDir: process.env.NEXT_DIST_DIR || ".next",
  experimental: { inlineCss: true },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
  },
  headers: async () => [
    {
      source: "/:all*(svg|jpg|png)",
      locale: false,
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, must-revalidate",
        },
      ],
    },
    {
      source: "/fonts/:all*",
      locale: false,
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
  ],
};

export default nextConfig;
