export type ProjectGroup = "featured" | "platform" | "more" | "earlier";

export interface Project {
  /** Stable id, shared by the English and Bangla entries; used for anchors and icons */
  slug: string;
  group: ProjectGroup;
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

export interface ProjectCardProps {
  project: ProjectType;
}
