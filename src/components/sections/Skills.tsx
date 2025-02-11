export default function Skills() {
  const skills = [
    "React.js",
    "Next.js",
    "TypeScript",
    "Context",
    "Redux",
    "GraphQL",
    "Rtk Query",
    "Tailwind CSS",
    "Material UI",
    "Antd",
    "Bootstrap"
  ];

  return (
    <section id="skills" className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 opacity-60 dark:opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(147,51,234,0.1),transparent),radial-gradient(circle_at_30%_70%,rgba(59,130,246,0.1),transparent)]" />
      </div>
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="animate-fade-in-up">
          <h2 className="text-4xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 animate-gradient-x">Skills & Technologies</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 text-center mb-12 max-w-2xl mx-auto">A comprehensive toolkit for building modern web applications</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {skills.map((skill) => (
              <div
                key={skill}
                className="group p-6 glass-effect rounded-xl text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl dark:hover:shadow-purple-500/10"
              >
                <span className="text-gray-800 dark:text-gray-200 font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {skill}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}