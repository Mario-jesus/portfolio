import { ContactInfo, SocialLink } from './contact.entity';

export interface Profile {
  id: string;
  firstName: string;
  lastName: string;
  title: string;
  bio: string;
  summary: string;
  profileImageUrl: string;
  resumeUrl?: string;
  location: string;
  yearsOfExperience: number;
  languages: Language[];
  interests: string[];
  availability: AvailabilityStatus;
  contactInfo: ContactInfo;
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

export enum AvailabilityStatus {
  AVAILABLE = 'available',
  BUSY = 'busy',
  NOT_AVAILABLE = 'not_available'
} 