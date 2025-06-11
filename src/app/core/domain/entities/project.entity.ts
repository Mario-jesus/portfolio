export interface Project {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  technologies: string[];
  imageUrl: string;
  demoUrl?: string;
  repositoryUrl?: string;
  documentationUrl?: string;
  startDate: Date;
  endDate?: Date;
  status: ProjectStatus;
  category: ProjectCategory;
  context: ProjectContext;
  featured: boolean;
  academicInfo?: AcademicProjectInfo;
  skillsApplied: string[];
  learningOutcomes: string[];
  challenges: string[];
  impact: string;
}

export interface AcademicProjectInfo {
  course?: string;
  semester: number;
  professor?: string;
  university: string;
  grade?: string;
  teamSize?: number;
  role?: string;
  duration: string;
}

export enum ProjectStatus {
  COMPLETED = 'completed',
  IN_PROGRESS = 'in_progress',
  PLANNED = 'planned',
  ARCHIVED = 'archived',
  PAUSED = 'paused'
}

export enum ProjectCategory {
  WEB_APPLICATION = 'web_application',
  MOBILE_APPLICATION = 'mobile_application',
  DESKTOP_APPLICATION = 'desktop_application',
  API = 'api',
  LIBRARY = 'library',
  DATA_ANALYSIS = 'data_analysis',
  MACHINE_LEARNING = 'machine_learning',
  RESEARCH = 'research',
  PROTOTYPE = 'prototype',
  OTHER = 'other'
}

export enum ProjectContext {
  ACADEMIC = 'academic',
  PERSONAL = 'personal',
  RESIDENCY = 'residency',
  INTERNSHIP = 'internship',
  FREELANCE = 'freelance',
  OPEN_SOURCE = 'open_source',
  HACKATHON = 'hackathon',
  COMPETITION = 'competition'
} 