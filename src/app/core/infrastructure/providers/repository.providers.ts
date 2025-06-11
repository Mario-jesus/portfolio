import { Provider } from '@angular/core';

// Domain Ports
import { ProjectRepository } from '../../domain/ports/project.repository';
import { ExperienceRepository } from '../../domain/ports/experience.repository';
import { SkillRepository } from '../../domain/ports/skill.repository';
import { ContactRepository, EmailService } from '../../domain/ports/contact.repository';
import { ProfileRepository } from '../../domain/ports/profile.repository';
import { ResidencyRepository } from '../../domain/ports/residency.repository';

// Infrastructure Implementations
import { InMemoryProjectRepository } from '../repositories/in-memory-project.repository';
import { InMemoryExperienceRepository } from '../repositories/in-memory-experience.repository';
import { InMemorySkillRepository } from '../repositories/in-memory-skill.repository';
import { InMemoryContactRepository } from '../repositories/in-memory-contact.repository';
import { InMemoryProfileRepository } from '../repositories/in-memory-profile.repository';
import { InMemoryResidencyRepository } from '../repositories/in-memory-residency.repository';
import { MockEmailService } from '../services/mock-email.service';

export const REPOSITORY_PROVIDERS: Provider[] = [
  // Project Repository
  {
    provide: ProjectRepository,
    useClass: InMemoryProjectRepository
  },
  
  // Experience Repository
  {
    provide: ExperienceRepository,
    useClass: InMemoryExperienceRepository
  },
  
  // Skill Repository
  {
    provide: SkillRepository,
    useClass: InMemorySkillRepository
  },
  
  // Contact Repository
  {
    provide: ContactRepository,
    useClass: InMemoryContactRepository
  },
  
  // Profile Repository
  {
    provide: ProfileRepository,
    useClass: InMemoryProfileRepository
  },
  
  // Residency Repository
  {
    provide: ResidencyRepository,
    useClass: InMemoryResidencyRepository
  },
  
  // Email Service
  {
    provide: EmailService,
    useClass: MockEmailService
  }
]; 