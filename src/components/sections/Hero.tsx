export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 opacity-60 dark:opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent),radial-gradient(circle_at_70%_60%,rgba(147,51,234,0.1),transparent)]" />
      </div>
      <div className="relative text-center">
        <div className="animate-fade-in-up">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 animate-gradient-x">
            Hi, I&lsquo;m <span className="inline-block">Muhammad Rasel</span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Senior Front End Developer with over 7 years of expertise in React.js, Next.js, and Team Leadership
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <a
              href="#contact"
              className="group relative px-8 py-4 w-full sm:w-auto text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full hover:shadow-lg hover:shadow-blue-500/25 dark:hover:shadow-purple-500/25 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <span className="relative z-10">Get in Touch</span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
            <a
              href="#projects"
              className="group relative px-8 py-4 w-full sm:w-auto text-lg font-semibold text-gray-700 dark:text-gray-200 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full border border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg hover:shadow-gray-200/25 dark:hover:shadow-gray-800/25 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              View Projects
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}