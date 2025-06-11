import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetAllExperiencesUseCase } from '../../../core/application/use-cases/experience/get-all-experiences.use-case';
import { GetWorkExperienceUseCase } from '../../../core/application/use-cases/experience/get-work-experience.use-case';
import { GetResidencyInfoUseCase } from '../../../core/application/use-cases/residency/get-residency-info.use-case';
import { Experience, ExperienceType } from '../../../core/domain/entities/experience.entity';
import { ProfessionalResidency } from '../../../core/domain/entities/residency.entity';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {
  private getAllExperiencesUseCase = inject(GetAllExperiencesUseCase);
  private getWorkExperienceUseCase = inject(GetWorkExperienceUseCase);
  private getResidencyInfoUseCase = inject(GetResidencyInfoUseCase);

  experiences = signal<Experience[]>([]);
  academicExperiences = signal<Experience[]>([]);
  certificationExperiences = signal<Experience[]>([]);
  volunteerExperiences = signal<Experience[]>([]);
  residencyInfo = signal<ProfessionalResidency | null>(null);
  isLoading = signal(true);
  activeFilter = signal<'all' | 'academic' | 'certifications' | 'volunteer'>('all');

  readonly ExperienceType = ExperienceType;

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading.set(true);
    
    // Cargar experiencias académicas
    this.getAllExperiencesUseCase.execute().subscribe({
      next: (experiences) => {
        this.experiences.set(experiences);
        this.academicExperiences.set(experiences.filter(exp => exp.type === ExperienceType.EDUCATION));
        this.certificationExperiences.set(experiences.filter(exp => exp.type === ExperienceType.CERTIFICATION));
        this.volunteerExperiences.set(experiences.filter(exp => exp.type === ExperienceType.VOLUNTEER));
        this.checkLoadingComplete();
      },
      error: (error) => {
        console.error('Error loading experiences:', error);
        this.isLoading.set(false);
      }
    });

    // Cargar información de residencia
    this.getResidencyInfoUseCase.execute().subscribe({
      next: (residency) => {
        this.residencyInfo.set(residency);
        this.checkLoadingComplete();
      },
      error: (error) => {
        console.error('Error loading residency info:', error);
        this.checkLoadingComplete();
      }
    });
  }

  private checkLoadingComplete(): void {
    if (this.experiences().length > 0 || this.residencyInfo()) {
      this.isLoading.set(false);
    }
  }

  setFilter(filter: 'all' | 'academic' | 'certifications' | 'volunteer'): void {
    this.activeFilter.set(filter);
  }

  getFilteredExperiences(): Experience[] {
    const filter = this.activeFilter();
    switch (filter) {
      case 'academic':
        return this.academicExperiences();
      case 'certifications':
        return this.certificationExperiences();
      case 'volunteer':
        return this.volunteerExperiences();
      default:
        return this.experiences();
    }
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'long'
    }).format(date);
  }

  calculateDuration(startDate: Date, endDate?: Date): string {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
    
    if (diffMonths < 12) {
      return `${diffMonths} ${diffMonths === 1 ? 'mes' : 'meses'}`;
    }
    
    const years = Math.floor(diffMonths / 12);
    const remainingMonths = diffMonths % 12;
    
    if (remainingMonths === 0) {
      return `${years} ${years === 1 ? 'año' : 'años'}`;
    }
    
    return `${years} ${years === 1 ? 'año' : 'años'} ${remainingMonths} ${remainingMonths === 1 ? 'mes' : 'meses'}`;
  }

  getExperienceIcon(type: ExperienceType): string {
    switch (type) {
      case ExperienceType.WORK:
        return 'M20 6L9 17l-5-5';
      case ExperienceType.EDUCATION:
        return 'M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z';
      case ExperienceType.CERTIFICATION:
        return 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z';
      case ExperienceType.VOLUNTEER:
        return 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z';
      default:
        return 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z';
    }
  }

  getTypeLabel(type: ExperienceType): string {
    switch (type) {
      case ExperienceType.WORK:
        return 'Experiencia Laboral';
      case ExperienceType.EDUCATION:
        return 'Formación Académica';
      case ExperienceType.CERTIFICATION:
        return 'Certificación';
      case ExperienceType.VOLUNTEER:
        return 'Voluntariado';
      default:
        return 'Experiencia';
    }
  }

  getTypeColor(type: ExperienceType): string {
    switch (type) {
      case ExperienceType.EDUCATION:
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300';
      case ExperienceType.CERTIFICATION:
        return 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300';
      case ExperienceType.VOLUNTEER:
        return 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300';
      case ExperienceType.WORK:
        return 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300';
      default:
        return 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300';
    }
  }

  trackByExperience(index: number, experience: Experience): string {
    return experience.id;
  }

  // Métodos específicos para residencia profesional
  getAcademicExperiencesCount(): number {
    return this.academicExperiences().length;
  }

  getCertificationsCount(): number {
    return this.certificationExperiences().length;
  }

  getVolunteerExperiencesCount(): number {
    return this.volunteerExperiences().length;
  }

  getTotalExperienceYears(): number {
    if (this.experiences().length === 0) return 0;
    
    const oldestExperience = this.experiences().reduce((oldest, current) => {
      return new Date(current.startDate) < new Date(oldest.startDate) ? current : oldest;
    });
    
    const diffTime = Math.abs(new Date().getTime() - new Date(oldestExperience.startDate).getTime());
    return Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365));
  }

  getCurrentSemester(): string {
    return '9°';
  }

  getUniversityName(): string {
    return 'Instituto Tecnológico Superior de los Ríos';
  }

  getCareerName(): string {
    return 'Ingeniería en Sistemas Computacionales';
  }

  getGPA(): number {
    return 9.2;
  }

  getCompletedCredits(): number {
    return 85;
  }

  getTotalCredits(): number {
    return 100;
  }

  getCreditProgress(): number {
    return Math.round((this.getCompletedCredits() / this.getTotalCredits()) * 100);
  }

  isAcademicExperience(experience: Experience): boolean {
    return experience.type === ExperienceType.EDUCATION;
  }

  isCertification(experience: Experience): boolean {
    return experience.type === ExperienceType.CERTIFICATION;
  }

  isVolunteerWork(experience: Experience): boolean {
    return experience.type === ExperienceType.VOLUNTEER;
  }

  getExperienceContext(experience: Experience): string {
    switch (experience.type) {
      case ExperienceType.EDUCATION:
        return 'Formación académica que contribuye a mi preparación profesional';
      case ExperienceType.CERTIFICATION:
        return 'Certificación que valida mis competencias técnicas';
      case ExperienceType.VOLUNTEER:
        return 'Experiencia de servicio comunitario y desarrollo personal';
      default:
        return 'Experiencia que enriquece mi formación profesional';
    }
  }
} 