export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: Date;
  status: ContactStatus;
  phoneNumber?: string;
  company?: string;
  position?: string;
  messageType: MessageType;
  residencyProposal?: ResidencyProposalInquiry;
}

export interface ResidencyProposalInquiry {
  companyName: string;
  projectTitle: string;
  projectDescription: string;
  duration: string;
  startDate?: Date;
  location: string;
  isRemote: boolean;
  requiredSkills: string[];
  mentorAvailable: boolean;
  compensationOffered: boolean;
  additionalBenefits?: string;
}

export enum ContactStatus {
  PENDING = 'pending',
  READ = 'read',
  REPLIED = 'replied',
  ARCHIVED = 'archived',
  UNDER_REVIEW = 'under_review'
}

export enum MessageType {
  GENERAL_INQUIRY = 'general_inquiry',
  RESIDENCY_PROPOSAL = 'residency_proposal',
  PROJECT_COLLABORATION = 'project_collaboration',
  ACADEMIC_INQUIRY = 'academic_inquiry',
  NETWORKING = 'networking',
  OTHER = 'other'
}

export interface ContactInfo {
  email: string;
  phone?: string;
  location: string;
  socialLinks: SocialLink[];
  availability: string;
  preferredContactMethod: ContactMethod;
  responseTime: string;
}

export interface SocialLink {
  platform: SocialPlatform;
  url: string;
  username: string;
}

export enum SocialPlatform {
  LINKEDIN = 'linkedin',
  GITHUB = 'github',
  TWITTER = 'twitter',
  INSTAGRAM = 'instagram',
  FACEBOOK = 'facebook',
  YOUTUBE = 'youtube',
  PORTFOLIO = 'portfolio',
  UNIVERSITY_EMAIL = 'university_email',
  ACADEMIC_PROFILE = 'academic_profile',
  OTHER = 'other'
}

export enum ContactMethod {
  EMAIL = 'email',
  PHONE = 'phone',
  LINKEDIN = 'linkedin',
  ANY = 'any'
} 