export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  responsibilities: string[];
  achievements: string[];
  technologies: string[];
  startDate: Date;
  endDate?: Date;
  type: ExperienceType;
  companyLogo?: string;
  companyUrl?: string;
}

export enum ExperienceType {
  WORK = 'work',
  EDUCATION = 'education',
  VOLUNTEER = 'volunteer',
  CERTIFICATION = 'certification'
} 