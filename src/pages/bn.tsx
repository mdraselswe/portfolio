import SeoHead from "@/components/atoms/SeoHead";
import HomePage from "@/components/organisms/HomePage";

// Static HTML with no React or Next.js runtime in the browser: every interaction lives in
// `siteScript`. This is what takes Lighthouse blocking time to zero.
export const config = { unstable_runtimeJS: false };

export default function BanglaHome() {
  return (
    <>
      <SeoHead lang="bn" />
      <HomePage lang="bn" />
    </>
  );
}
