export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  level: SkillLevel;
  description?: string;
  iconUrl?: string;
  yearsOfExperience?: number;
  certifications?: string[];
}

export enum SkillCategory {
  PROGRAMMING_LANGUAGE = 'programming_language',
  FRAMEWORK = 'framework',
  DATABASE = 'database',
  TOOL = 'tool',
  SOFT_SKILL = 'soft_skill',
  METHODOLOGY = 'methodology',
  CLOUD = 'cloud',
  OPERATING_SYSTEM = 'operating_system',
  OTHER = 'other'
}

export enum SkillLevel {
  BEGINNER = 'beginner',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  EXPERT = 'expert'
} 