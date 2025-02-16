export interface Skill {
  title: string;
  skills: string[];
}

export interface SkillCategory {
  [key: string]: Skill[];
}

export interface SkillCardProps {
  skill: string;
}
