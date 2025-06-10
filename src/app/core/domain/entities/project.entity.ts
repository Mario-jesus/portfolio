export interface Project {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  technologies: string[];
  imageUrl: string;
  demoUrl?: string;
  repositoryUrl?: string;
  startDate: Date;
  endDate?: Date;
  status: ProjectStatus;
  category: ProjectCategory;
  featured: boolean;
}

export enum ProjectStatus {
  COMPLETED = 'completed',
  IN_PROGRESS = 'in_progress',
  PLANNED = 'planned',
  ARCHIVED = 'archived'
}

export enum ProjectCategory {
  WEB_APPLICATION = 'web_application',
  MOBILE_APPLICATION = 'mobile_application',
  DESKTOP_APPLICATION = 'desktop_application',
  API = 'api',
  LIBRARY = 'library',
  OTHER = 'other'
} 