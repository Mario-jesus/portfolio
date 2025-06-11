import { ContactInfo } from './contact.entity';
import { ResidencyDuration } from './residency.entity';

export interface Profile {
  id: string;
  firstName: string;
  lastName: string;
  title: string; // Ej: "Estudiante de Ingeniería en Sistemas"
  bio: string;
  summary: string;
  profileImageUrl: string;
  resumeUrl?: string;
  academicCvUrl?: string; // CV específico para residencia
  location: string;
  currentSemester: number;
  expectedGraduationDate: Date;
  university: string;
  degree: string;
  gpa?: number;
  languages: Language[];
  interests: string[];
  academicInterests: string[]; // Áreas de interés académico/profesional
  availability: ResidencyAvailabilityStatus;
  residencyObjectives: ResidencyObjectives;
  contactInfo: ContactInfo;
}

export interface ResidencyObjectives {
  duration: ResidencyDuration;
  preferredStartDate: Date;
  preferredEndDate?: Date;
  objectives: string[]; // Objetivos específicos de la residencia
  areasOfInterest: string[]; // Áreas donde quiere hacer la residencia
  whatCanContribute: string[]; // Lo que puede aportar a la empresa
  learningGoals: string[]; // Qué espera aprender
}

export interface Language {
  name: string;
  level: LanguageLevel;
  code: string; // ISO 639-1 code (e.g., 'en', 'es', 'fr')
}

export enum LanguageLevel {
  BASIC = 'basic',
  INTERMEDIATE = 'intermediate',
  ADVANCED = 'advanced',
  NATIVE = 'native'
}

export enum ResidencyAvailabilityStatus {
  SEEKING_RESIDENCY = 'seeking_residency',
  AVAILABLE_SOON = 'available_soon',
  IN_RESIDENCY = 'in_residency',
  COMPLETED_RESIDENCY = 'completed_residency'
} 