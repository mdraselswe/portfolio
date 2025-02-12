import { projects } from "@/data/projects";
import ProjectCard from "../atoms/ProjectCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";

export default function Projects() {
  const { language } = useLanguage();

  return (
    <section id="projects" className="relative py-20 overflow-hidden bg-transparent">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-gray-50/90 dark:from-gray-900/90 dark:to-gray-800/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(59,130,246,0.05),transparent),radial-gradient(circle_at_70%_30%,rgba(147,51,234,0.05),transparent)]" />
      </div>
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="animate-fade-in-up">
          <h2 className="text-4xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 animate-gradient-x">
            {translations[language].projects.title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 text-center mb-12 max-w-2xl mx-auto">
            {translations[language].projects.subtitle}
          </p>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects[language].map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
