import type { Metadata, Viewport } from "next";
import HomePage from "@/components/organisms/HomePage";
import { buildMetadata, viewportConfig } from "@/lib/seo";

export const metadata: Metadata = buildMetadata("bn");
export const viewport: Viewport = viewportConfig;

export default function Page() {
  return <HomePage lang="bn" />;
}
