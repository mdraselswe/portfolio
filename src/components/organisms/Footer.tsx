import { FaFacebook, FaGithub, FaLinkedin, FaXTwitter } from "@/lib/icons";
import { getT } from "@/lib/i18n";
import type { Language } from "@/types/context";

const socials = [
  { label: "GitHub", href: "https://github.com/mdraselswe", Icon: FaGithub },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/mdraselswe", Icon: FaLinkedin },
  { label: "X", href: "https://x.com/mdraselswe", Icon: FaXTwitter },
  { label: "Facebook", href: "https://facebook.com/mdraselswe", Icon: FaFacebook },
];

export default function Footer({ lang }: { lang: Language }) {
  const t = getT(lang);

  return (
    <footer className="border-t border-ink/10 py-10">
      <div className="section-shell flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-lg font-semibold">{t.name}</p>
          <p className="mt-1 max-w-md text-sm text-muted">{t.footer.role}</p>
          <p className="mt-1 text-sm text-muted">
            © {new Date().getFullYear()} {t.footer.rights}. {t.footer.built}.
          </p>
        </div>

        <ul aria-label={t.footer.social} className="-mx-2 flex items-center">
          {socials.map(({ label, href, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-grid h-11 w-11 place-items-center rounded-full text-lg transition-colors hover:bg-ink/8"
              >
                <Icon aria-hidden />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
