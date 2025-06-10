import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetAllExperiencesUseCase } from '../../../core/application/use-cases/experience/get-all-experiences.use-case';
import { GetWorkExperienceUseCase } from '../../../core/application/use-cases/experience/get-work-experience.use-case';
import { Experience, ExperienceType } from '../../../core/domain/entities/experience.entity';

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

  experiences = signal<Experience[]>([]);
  workExperiences = signal<Experience[]>([]);
  educationExperiences = signal<Experience[]>([]);
  isLoading = signal(true);
  activeFilter = signal<'all' | 'work' | 'education'>('all');

  readonly ExperienceType = ExperienceType;

  ngOnInit(): void {
    this.loadExperiences();
  }

  private loadExperiences(): void {
    this.isLoading.set(true);
    
    this.getAllExperiencesUseCase.execute().subscribe({
      next: (experiences) => {
        this.experiences.set(experiences);
        this.workExperiences.set(experiences.filter(exp => exp.type === ExperienceType.WORK));
        this.educationExperiences.set(experiences.filter(exp => exp.type === ExperienceType.EDUCATION));
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading experiences:', error);
        this.isLoading.set(false);
      }
    });
  }

  setFilter(filter: 'all' | 'work' | 'education'): void {
    this.activeFilter.set(filter);
  }

  getFilteredExperiences(): Experience[] {
    const filter = this.activeFilter();
    switch (filter) {
      case 'work':
        return this.workExperiences();
      case 'education':
        return this.educationExperiences();
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
      default:
        return 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z';
    }
  }

  getTypeLabel(type: ExperienceType): string {
    switch (type) {
      case ExperienceType.WORK:
        return 'Experiencia Laboral';
      case ExperienceType.EDUCATION:
        return 'Educación';
      case ExperienceType.CERTIFICATION:
        return 'Certificación';
      case ExperienceType.VOLUNTEER:
        return 'Voluntariado';
      default:
        return 'Experiencia';
    }
  }

  trackByExperience(index: number, experience: Experience): string {
    return experience.id;
  }
} 