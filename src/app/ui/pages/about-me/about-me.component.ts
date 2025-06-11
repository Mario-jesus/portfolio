import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressiveImageComponent } from '../../components/progressive-image/progressive-image';
import { RouterModule } from '@angular/router';
import { GetProfileUseCase } from '../../../core/application/use-cases/profile/get-profile.use-case';
import { GetAllExperiencesUseCase } from '../../../core/application/use-cases/experience/get-all-experiences.use-case';
import { GetAllSkillsUseCase } from '../../../core/application/use-cases/skill/get-all-skills.use-case';
import { GetResidencyInfoUseCase } from '../../../core/application/use-cases/residency/get-residency-info.use-case';
import { Profile, LanguageLevel, ResidencyAvailabilityStatus } from '../../../core/domain/entities/profile.entity';
import { Experience } from '../../../core/domain/entities/experience.entity';
import { Skill, SkillLevel } from '../../../core/domain/entities/skill.entity';
import { ProfessionalResidency, ResidencyArea, ResidencyDuration, TimeCommitment, LocationPreference } from '../../../core/domain/entities/residency.entity';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [CommonModule, RouterModule, ProgressiveImageComponent],
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements OnInit {
  profile = signal<Profile | null>(null);
  experiences = signal<Experience[]>([]);
  skills = signal<Skill[]>([]);
  residencyInfo = signal<ProfessionalResidency | null>(null);
  isLoading = signal(false);
  error = signal<string | null>(null);

  private getProfileUseCase = inject(GetProfileUseCase);
  private getAllExperiencesUseCase = inject(GetAllExperiencesUseCase);
  private getAllSkillsUseCase = inject(GetAllSkillsUseCase);
  private getResidencyInfoUseCase = inject(GetResidencyInfoUseCase);

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading.set(true);
    this.error.set(null);

    // Cargar perfil
    this.getProfileUseCase.execute().subscribe({
      next: (profile) => this.profile.set(profile),
      error: (error) => {
        console.error('Error loading profile:', error);
        this.error.set('Error al cargar el perfil');
      }
    });

    // Cargar experiencias académicas
    this.getAllExperiencesUseCase.execute().subscribe({
      next: (experiences) => this.experiences.set(experiences),
      error: (error) => {
        console.error('Error loading experiences:', error);
        this.error.set('Error al cargar experiencias');
      }
    });

    // Cargar habilidades técnicas
    this.getAllSkillsUseCase.execute().subscribe({
      next: (skills) => this.skills.set(skills),
      error: (error) => {
        console.error('Error loading skills:', error);
        this.error.set('Error al cargar habilidades');
      }
    });

    // Cargar información de residencia
    this.getResidencyInfoUseCase.execute().subscribe({
      next: (residency) => {
        this.residencyInfo.set(residency);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading residency info:', error);
        this.error.set('Error al cargar información de residencia');
        this.isLoading.set(false);
      }
    });
  }

  getLanguageLevelText(level: LanguageLevel): string {
    const levels = {
      [LanguageLevel.BASIC]: 'Básico',
      [LanguageLevel.INTERMEDIATE]: 'Intermedio',
      [LanguageLevel.ADVANCED]: 'Avanzado',
      [LanguageLevel.NATIVE]: 'Nativo'
    };
    return levels[level] || level;
  }

  getLanguageLevelColor(level: LanguageLevel): string {
    const colors = {
      [LanguageLevel.BASIC]: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
      [LanguageLevel.INTERMEDIATE]: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      [LanguageLevel.ADVANCED]: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300',
      [LanguageLevel.NATIVE]: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
    };
    return colors[level] || 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300';
  }

  getSkillLevelText(level: SkillLevel): string {
    const levels = {
      [SkillLevel.BEGINNER]: 'Principiante',
      [SkillLevel.INTERMEDIATE]: 'Intermedio',
      [SkillLevel.ADVANCED]: 'Avanzado',
      [SkillLevel.EXPERT]: 'Experto'
    };
    return levels[level] || level;
  }

  getSkillLevelColor(level: SkillLevel): string {
    const colors = {
      [SkillLevel.BEGINNER]: 'bg-red-500',
      [SkillLevel.INTERMEDIATE]: 'bg-yellow-500',
      [SkillLevel.ADVANCED]: 'bg-blue-500',
      [SkillLevel.EXPERT]: 'bg-emerald-500'
    };
    return colors[level] || 'bg-gray-500';
  }

  getSkillLevelWidth(level: SkillLevel): string {
    const widths = {
      [SkillLevel.BEGINNER]: 'w-1/4',
      [SkillLevel.INTERMEDIATE]: 'w-2/4',
      [SkillLevel.ADVANCED]: 'w-3/4',
      [SkillLevel.EXPERT]: 'w-full'
    };
    return widths[level] || 'w-1/4';
  }

  getAcademicExperiences(): Experience[] {
    return this.experiences().filter(exp => exp.type === 'education');
  }

  getVolunteerExperiences(): Experience[] {
    return this.experiences().filter(exp => exp.type === 'volunteer');
  }

  getCertificationExperiences(): Experience[] {
    return this.experiences().filter(exp => exp.type === 'certification');
  }

  getTimeCommitment(time: TimeCommitment): string {
    switch (time) {
      case TimeCommitment.PART_TIME:
        return 'Tiempo Parcial (20-30 horas/semana)';
      case TimeCommitment.FULL_TIME:
        return 'Tiempo Completo (40+ horas/semana)';
      case TimeCommitment.FLEXIBLE:
        return 'Horario Flexible';
      default:
        return 'No especificado';
    }
  }

  getLocationPreference(preference: LocationPreference): string {
    switch (preference) {
      case LocationPreference.ON_SITE:
        return 'Presencial';
      case LocationPreference.REMOTE:
        return 'Remoto';
      case LocationPreference.HYBRID:
        return 'Híbrido';
      case LocationPreference.FLEXIBLE:
        return 'Flexible';
      default:
        return 'No especificado';
    }
  }

  getAvailabilityText(status: ResidencyAvailabilityStatus): string {
    switch (status) {
      case ResidencyAvailabilityStatus.SEEKING_RESIDENCY:
        return 'Buscando Residencia Profesional';
      case ResidencyAvailabilityStatus.AVAILABLE_SOON:
        return 'Disponible Pronto para Residencia';
      case ResidencyAvailabilityStatus.IN_RESIDENCY:
        return 'Actualmente en Residencia';
      case ResidencyAvailabilityStatus.COMPLETED_RESIDENCY:
        return 'Residencia Completada';
      default:
        return 'Estado no definido';
    }
  }

  getAvailabilityColor(status: ResidencyAvailabilityStatus): string {
    switch (status) {
      case ResidencyAvailabilityStatus.SEEKING_RESIDENCY:
        return 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300';
      case ResidencyAvailabilityStatus.AVAILABLE_SOON:
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300';
      case ResidencyAvailabilityStatus.IN_RESIDENCY:
        return 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300';
      case ResidencyAvailabilityStatus.COMPLETED_RESIDENCY:
        return 'bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300';
      default:
        return 'bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300';
    }
  }

  getAreaText(area: ResidencyArea): string {
    const areas: Record<ResidencyArea, string> = {
      [ResidencyArea.SOFTWARE_DEVELOPMENT]: 'Desarrollo de Software',
      [ResidencyArea.BACKEND_DEVELOPMENT]: 'Desarrollo Backend',
      [ResidencyArea.FRONTEND_DEVELOPMENT]: 'Desarrollo Frontend',
      [ResidencyArea.WEB_DEVELOPMENT]: 'Desarrollo Web',
      [ResidencyArea.MOBILE_DEVELOPMENT]: 'Desarrollo Móvil',
      [ResidencyArea.DATA_SCIENCE]: 'Ciencia de Datos',
      [ResidencyArea.ARTIFICIAL_INTELLIGENCE]: 'Inteligencia Artificial',
      [ResidencyArea.CYBERSECURITY]: 'Ciberseguridad',
      [ResidencyArea.DEVOPS]: 'DevOps',
      [ResidencyArea.UI_UX_DESIGN]: 'Diseño UI/UX',
      [ResidencyArea.PROJECT_MANAGEMENT]: 'Gestión de Proyectos',
      [ResidencyArea.QUALITY_ASSURANCE]: 'Aseguramiento de Calidad',
      [ResidencyArea.RESEARCH_DEVELOPMENT]: 'Investigación y Desarrollo',
      [ResidencyArea.OTHER]: 'Otro'
    };
    return areas[area] || area;
  }

  getDurationText(duration: ResidencyDuration): string {
    const durations = {
      [ResidencyDuration.SHORT_TERM]: 'Corto plazo (1-3 meses)',
      [ResidencyDuration.MEDIUM_TERM]: 'Mediano plazo (4-6 meses)',
      [ResidencyDuration.LONG_TERM]: 'Largo plazo (6+ meses)',
      [ResidencyDuration.FLEXIBLE]: 'Flexible'
    };
    return durations[duration] || duration;
  }

  calculateGPA(): number {
    // Simulación de cálculo de promedio académico
    return this.profile()?.gpa || 8.5;
  }

  getCompletedCredits(): number {
    return 94;
  }

  downloadAcademicCV(): void {
    const cvUrl = this.profile()?.academicCvUrl || this.profile()?.resumeUrl;
    if (cvUrl) {
      window.open(cvUrl, '_blank');
    }
  }

  trackBySkillId(index: number, skill: Skill): string {
    return skill.id;
  }

  trackByExperienceId(index: number, experience: Experience): string {
    return experience.id;
  }

  trackByIndex(index: number): number {
    return index;
  }
} 