import { containerVariants, itemVariants } from "@/config/animations";
import { useLanguage } from "@/contexts/LanguageContext";
import { skills } from "@/data/skills";
import { motion } from "@/lib";
import { translations } from "@/translations";
import SkillCard from "../atoms/SkillCard";

export default function Skills() {
  const { language } = useLanguage();
  const skillCategories = skills[language];

  return (
    <section
      id="skills"
      className="relative min-h-screen flex items-center justify-center py-20 overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
    >
      <div className="absolute inset-0 -z-10 w-screen overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.2),transparent_50%),radial-gradient(circle_at_80%_80%,rgba(147,51,234,0.2),transparent_50%)]" />
        <div
          className="absolute inset-0 bg-[linear-gradient(45deg,rgba(59,130,246,0.1)_25%,transparent_25%,transparent_75%,rgba(147,51,234,0.1)_75%)]"
          style={{ backgroundSize: "60px 60px" }}
        />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-30 dark:opacity-20 [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-white/10 dark:via-gray-900/5 dark:to-gray-900/10" />
      </div>
      <motion.div
        key={language}
        className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div variants={itemVariants}>
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 animate-gradient-x leading-relaxed py-3">
              {translations[language].skills.title}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed py-1">
              {translations[language].skills.subtitle}
            </p>
          </div>
        </motion.div>

        <div className="space-y-12">
          {skillCategories.map((category, index) => (
            <motion.div key={category.title || index} variants={itemVariants} className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                {category.title}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div key={skill} variants={itemVariants} custom={skillIndex}>
                    <SkillCard skill={skill} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
