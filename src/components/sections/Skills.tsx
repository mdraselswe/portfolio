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
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Skills & Technologies</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
          {skills.map((skill) => (
            <div
              key={skill}
              className="p-4 bg-white dark:bg-gray-700 rounded-lg text-center shadow-sm hover:shadow-md transition-shadow"
            >
              {skill}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}