export interface ProjectType {
  title: string;
  description: string;
  tech: string[];
  github?: string;
  demo?: string;
  demos?: {
    nextdhabian: string;
    nextbuetian: string;
  };
}

export interface SkillCardProps {
  skill: string;
}

export interface ProjectCardProps {
  project: ProjectType;
}