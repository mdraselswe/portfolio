interface SkillCardProps {
  skill: string;
}

export default function SkillCard({ skill }: SkillCardProps) {
  return (
    <div className="group relative overflow-hidden">
      <div className="relative bg-white dark:bg-gray-800 rounded-xl p-6 flex items-center justify-center transition-all duration-300 hover:scale-105 border border-gray-100 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="relative z-10">
          <span className="text-base font-semibold text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all duration-300">
            {skill}
          </span>
        </div>
      </div>
    </div>
  );
}
