import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";
import { FaGithub, FaLinkedin, FaXTwitter, FaFacebook } from "react-icons/fa6";

export default function Footer() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <footer className="relative py-16 overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(59,130,246,0.1),transparent),radial-gradient(circle_at_70%_30%,rgba(147,51,234,0.1),transparent)]" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              {t.name}
            </h3>
            <p className="mt-2 text-gray-700 dark:text-gray-300">{t.footer.role}</p>
          </div>
          <div className="text-center">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
              {t.footer.quickLinks}
            </h4>
            <nav className="space-y-2">
              <a
                href="#"
                className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
              >
                {t.header.home}
              </a>
              <a
                href="#skills"
                className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
              >
                {t.header.skills}
              </a>
              <a
                href="#projects"
                className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
              >
                {t.header.projects}
              </a>
              <a
                href="#contact"
                className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
              >
                {t.header.contact}
              </a>
            </nav>
          </div>
          <div className="text-center md:text-right">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
              {t.footer.connect}
            </h4>
            <div className="flex justify-center md:justify-end space-x-4">
              <a
                href="http://github.com/mdraselswe"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
              >
                <span className="sr-only">GitHub</span>
                <FaGithub className="h-6 w-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/mdraselswe"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
              >
                <span className="sr-only">LinkedIn</span>
                <FaLinkedin className="h-6 w-6" />
              </a>
              <a
                href="https://x.com/mdraselswe"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
              >
                <span className="sr-only">Twitter</span>
                <FaXTwitter className="h-6 w-6" />
              </a>
              <a
                href="https://facebook.com/mdraselswe"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300"
              >
                <span className="sr-only">Facebook</span>
                <FaFacebook className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-300 dark:border-gray-700 text-center">
          <p className="text-gray-700 dark:text-gray-300">
            &copy; {new Date().getFullYear()} {t.name}. {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
