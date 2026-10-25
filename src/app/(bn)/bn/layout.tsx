import RootShell from "@/components/organisms/RootShell";

export default function BanglaLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="bn">{children}</RootShell>;
}
