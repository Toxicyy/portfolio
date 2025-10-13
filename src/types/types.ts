import type { Variants } from "framer-motion";

export interface Project {
  id: number;
  title: string;
  shortDescription: string;
  fullDescription: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  images: string[];
  publishedDate: string;
  role: string;
  badgeColor?: string;
  status?: string;
  isApi?: boolean;
}

export interface Skill {
  name: string;
  icon: React.ReactNode;
  category: string;
}

export interface ContactInfo {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  value: string;
  href: string;
}

export interface FormData {
  name: string;
  email: string;
  message: string;
}

export type AnimationVariants = Variants;

export type PageType = "home" | number;
