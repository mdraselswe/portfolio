import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Hi, I'm <span className="text-blue-600 dark:text-blue-400">Muhammad Rasel</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Senior Front End Developer with over 7 years of expertise in React.js, Next.js, and Team Leadership
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="#contact"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Get in Touch
            </a>
            <a
              href="#projects"
              className="border border-gray-300 dark:border-gray-700 px-6 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              View Projects
            </a>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Skills & Technologies</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
            {[
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
            ].map((skill) => (
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

      {/* Projects Section */}
      <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Projects</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Bohubrini - NextJS Learning Platform",
              description: "Leading skill-learning platform in Bangladesh. Utilized modern technologies like Next.js and GraphQL to build a fast, scalable, and interactive web application. Optimized the platform for performance and SEO.",
              tech: ["Next.js", "TypeScript", "GraphQL", "Tailwind CSS"],
            },
            {
              title: "Shikho Shop - E-commerce Platform",
              description: "Built a dynamic and responsive frontend using Next.js, ensuring an intuitive shopping experience across all devices. Developed reusable components to maintain a consistent UI and enhance development efficiency.",
              tech: ["Next.js", "TypeScript", "GraphQL", "Tailwind CSS"],
            },
            {
              title: "Responsive Template - SASS",
              description: "Developed a responsive template without frameworks, implementing advanced CSS features like Grid, Modals, and Animations. Created a modern and flexible design system.",
              tech: ["SASS", "Advanced CSS", "HTML5"],
            },
          ].map((project, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="text-sm bg-gray-100 dark:bg-gray-600 px-3 py-1 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            I'm always open to new opportunities and collaborations. Feel free to reach out!
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="mailto:mdraselwe@gmail.com"
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Send me an email
            </a>
            <a
              href="https://www.linkedin.com/in/mdraselwe"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-gray-300 dark:border-gray-700 px-8 py-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Connect on LinkedIn
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
