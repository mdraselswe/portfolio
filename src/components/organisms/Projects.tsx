import { projects } from "@/data/projects";
import ProjectCard from "../atoms/ProjectCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/translations";
import { motion } from "framer-motion";

export default function Projects() {
  const { language } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="projects"
      className="relative py-20 overflow-hidden bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-gray-900/95 dark:via-gray-800/95"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(59,130,246,0.15),transparent_70%),radial-gradient(circle_at_30%_70%,rgba(147,51,234,0.15),transparent_70%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(60deg,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0)_100%)] dark:bg-[linear-gradient(60deg,rgba(0,0,0,0.1)_0%,rgba(0,0,0,0)_100%)]" />
      </div>
      <motion.div
        className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div variants={itemVariants}>
          <h2 className="text-4xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 animate-gradient-x leading-relaxed py-3">
            {translations[language].projects.title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 text-center mb-12 max-w-2xl mx-auto leading-relaxed py-1">
            {translations[language].projects.subtitle}
          </p>
        </motion.div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects[language].map((project, index) => (
            <motion.div key={index} variants={itemVariants}>
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
