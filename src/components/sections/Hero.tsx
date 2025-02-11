export default function Hero() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6">
          Hi, I&lsquo;m <span className="text-blue-600 dark:text-blue-400">Muhammad Rasel</span>
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
  );
}