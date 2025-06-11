export interface ProfessionalResidency {
  id: string;
  title: string;
  description: string;
  objectives: string[];
  duration: ResidencyDuration;
  preferredStartDate: Date;
  preferredEndDate?: Date;
  areasOfInterest: ResidencyArea[];
  requiredSkills: string[];
  learningGoals: string[];
  deliverables: string[];
  benefits: ResidencyBenefits;
  requirements: ResidencyRequirements;
  status: ResidencyStatus;
}

export interface ResidencyBenefits {
  forStudent: string[]; // Beneficios para el estudiante
  forCompany: string[]; // Beneficios para la empresa
}

export interface ResidencyRequirements {
  academicLevel: AcademicLevel;
  minimumSemester: number;
  requiredSkills: string[];
  preferredSkills: string[];
  timeCommitment: TimeCommitment;
  location: LocationPreference;
}

export interface ResidencyProposal {
  id: string;
  companyName: string;
  projectTitle: string;
  description: string;
  duration: ResidencyDuration;
  startDate: Date;
  endDate?: Date;
  area: ResidencyArea;
  requiredSkills: string[];
  mentorInfo?: MentorInfo;
  compensation?: ResidencyCompensation;
  status: ProposalStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface MentorInfo {
  name: string;
  position: string;
  email: string;
  experience: string;
}

export interface ResidencyCompensation {
  type: CompensationType;
  amount?: number;
  currency?: string;
  benefits: string[];
}

export enum ResidencyDuration {
  SHORT_TERM = 'short_term', // 1-3 meses
  MEDIUM_TERM = 'medium_term', // 4-6 meses
  LONG_TERM = 'long_term', // 6+ meses
  FLEXIBLE = 'flexible'
}

export enum ResidencyArea {
  SOFTWARE_DEVELOPMENT = 'software_development',
  BACKEND_DEVELOPMENT = 'backend_development',
  FRONTEND_DEVELOPMENT = 'frontend_development',
  WEB_DEVELOPMENT = 'web_development',
  MOBILE_DEVELOPMENT = 'mobile_development',
  DATA_SCIENCE = 'data_science',
  ARTIFICIAL_INTELLIGENCE = 'artificial_intelligence',
  CYBERSECURITY = 'cybersecurity',
  DEVOPS = 'devops',
  UI_UX_DESIGN = 'ui_ux_design',
  PROJECT_MANAGEMENT = 'project_management',
  QUALITY_ASSURANCE = 'quality_assurance',
  RESEARCH_DEVELOPMENT = 'research_development',
  OTHER = 'other'
}

export enum AcademicLevel {
  UNDERGRADUATE = 'undergraduate',
  GRADUATE = 'graduate',
  POSTGRADUATE = 'postgraduate'
}

export enum TimeCommitment {
  PART_TIME = 'part_time', // 20-30 horas/semana
  FULL_TIME = 'full_time', // 40+ horas/semana
  FLEXIBLE = 'flexible'
}

export enum LocationPreference {
  ON_SITE = 'on_site',
  REMOTE = 'remote',
  HYBRID = 'hybrid',
  FLEXIBLE = 'flexible'
}

export enum ResidencyStatus {
  PLANNING = 'planning',
  SEEKING = 'seeking',
  APPLIED = 'applied',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled'
}

export enum ProposalStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  UNDER_REVIEW = 'under_review',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  EXPIRED = 'expired'
}

export enum CompensationType {
  NONE = 'none',
  STIPEND = 'stipend',
  HOURLY = 'hourly',
  PROJECT_BASED = 'project_based',
  BENEFITS_ONLY = 'benefits_only'
} 