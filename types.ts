import { ReactNode } from 'react';

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  github?: string;
  orcid?: string;
  researchgate?: string;
}

export interface ProjectMedia {
  type: 'image' | 'video';
  url: string; // Direct link for full view (or video stream)
  thumbnailUrl?: string; // Preview image
}

export interface Reference {
  name: string;
  role: string;
  phone?: string;
  email?: string;
  linkedin?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string | ReactNode;
  period: string;
  description: string; // The short summary
  details?: string;    // The expandable detailed content
  technologies: string[];
  media?: ProjectMedia[];
  references?: Reference[];
}

export interface Education {
  id: string;
  degree: string;
  degreeUrl?: string;
  institution: string;
  period: string;
  details?: string[];
  documents?: { label: string; url: string }[];
}

export interface ProjectLink {
  url: string;
  type: 'github' | 'researchgate' | 'other';
}

export interface Project {
  id: string;
  title: string;
  year: string;
  role?: string;
  description: string;
  technologies?: string[];
  repoUrl?: string; 
  links?: ProjectLink[];
  media?: ProjectMedia[]; 
  academicContext?: 'bachelor' | 'specialist' | 'applied';
}

export interface SkillItem {
  name: string;
  url?: string;
  icon?: string; // URL for the image
  isConcept?: boolean; // If true, might render differently or use a Lucide icon wrapper
}

export interface SkillCategory {
  category: string;
  skills: SkillItem[];
}

export interface TitleItem {
  label: string;
  url: string;
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  url?: string;
  documents?: { label: string; url: string }[];
}

export interface ResumeData {
  name: string;
  title: TitleItem[];
  about: string;
  contact: ContactInfo;
  experience: Experience[];
  education: Education[];
  workProjects: Project[];
  academicProjects: Project[];
  skills: SkillCategory[];
  certifications: Certification[];
  languages: string[];
}