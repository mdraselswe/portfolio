export interface Project {
  title: string;
  description: string;
  tech: string[];
  github?: string;
  demo?: string;
  demos?: {
    nextdhabian?: string;
    nextbuetian?: string;
  };
}

export type ProjectType = Project;

export interface SkillCardProps {
  skill: string;
}

export interface ProjectCardProps {
  project: ProjectType;
}
