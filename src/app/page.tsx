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
              title: "Shikho Shop - E-commerce Platform",
              description: "A comprehensive e-commerce platform for educational resources and materials, built with modern web technologies and best practices.",
              tech: ["Next.js", "TypeScript", "GraphQL", "Tailwind CSS"],
              demo: "https://shop.shikho.com"
            },
            {
              title: "Bohubrihi - Learning Platform",
              description: "Leading skill-learning platform in Bangladesh. Built with Next.js and GraphQL, featuring interactive courses, progress tracking, and seamless user experience.",
              tech: ["Next.js", "TypeScript", "GraphQL", "Tailwind CSS"],
              demo: "https://bohubrihi.com"
            },
            {
              title: "NextDhabian & NextBuetian",
              description: "Specialized learning platforms tailored for university students, offering targeted educational content and resources.",
              tech: ["Next.js", "TypeScript", "GraphQL", "Tailwind CSS"],
              demo: "https://nextdhabian.shikho.com"
            },
            {
              title: "Modern Responsive Website",
              description: "A showcase of modern web design principles featuring responsive layouts and clean aesthetics.",
              tech: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
              github: "https://github.com/mdraselswe/Modern-Responsive-Website",
              demo: "https://mdraselswe.github.io/Modern-Responsive-Website"
            },
            {
              title: "Natours Tour",
              description: "An elegant tour booking website demonstrating advanced CSS and modern design patterns.",
              tech: ["HTML5", "SASS", "CSS Animations", "Responsive Design"],
              github: "https://github.com/mdraselswe/Natours-Tour",
              demo: "https://mdraselswe.github.io/Natours-Tour"
            },
            {
              title: "GreenSock Animations",
              description: "Interactive web animations showcase using the GreenSock Animation Platform (GSAP).",
              tech: ["JavaScript", "GSAP", "HTML5", "CSS3"],
              github: "https://github.com/mdraselswe/GreenSock",
              demo: "https://mdraselswe.github.io/GreenSock/"
            },
            {
              title: "Money Management App",
              description: "A comprehensive financial management application for tracking expenses and managing budgets.",
              tech: ["React Native", "Redux", "Node.js", "MongoDB"],
              github: "https://github.com/mdraselswe/money-management-app"
            },
            {
              title: "Crown Clothing",
              description: "E-commerce platform for fashion retail with modern shopping experience.",
              tech: ["React", "Redux", "Firebase", "Styled Components"],
              github: "https://github.com/mdraselswe/crwn-clothing"
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
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="text-sm bg-gray-100 dark:bg-gray-600 px-3 py-1 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Live Demo
                  </a>
                )}
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
              href="mailto:mdraselswe@gmail.com"
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Send me an email
            </a>
            <a
              href="https://www.linkedin.com/in/mdraselswe"
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
