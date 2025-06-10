import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressiveImageComponent } from '../../components/progressive-image/progressive-image';
import { RouterModule } from '@angular/router';
import { GetProfileUseCase } from '../../../core/application/use-cases/profile/get-profile.use-case';
import { GetAllExperiencesUseCase } from '../../../core/application/use-cases/experience/get-all-experiences.use-case';
import { GetAllSkillsUseCase } from '../../../core/application/use-cases/skill/get-all-skills.use-case';
import { Profile, LanguageLevel } from '../../../core/domain/entities/profile.entity';
import { Experience } from '../../../core/domain/entities/experience.entity';
import { Skill, SkillLevel } from '../../../core/domain/entities/skill.entity';

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

  constructor(
    private getProfileUseCase: GetProfileUseCase,
    private getAllExperiencesUseCase: GetAllExperiencesUseCase,
    private getAllSkillsUseCase: GetAllSkillsUseCase
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    // Cargar perfil
    this.getProfileUseCase.execute().subscribe({
      next: (profile) => this.profile.set(profile),
      error: (error) => console.error('Error loading profile:', error)
    });

    // Cargar experiencias
    this.getAllExperiencesUseCase.execute().subscribe({
      next: (experiences) => this.experiences.set(experiences),
      error: (error) => console.error('Error loading experiences:', error)
    });

    // Cargar habilidades
    this.getAllSkillsUseCase.execute().subscribe({
      next: (skills) => this.skills.set(skills),
      error: (error) => console.error('Error loading skills:', error)
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

  getWorkExperiences(): Experience[] {
    return this.experiences().filter(exp => exp.type === 'work');
  }

  getEducationExperiences(): Experience[] {
    return this.experiences().filter(exp => exp.type === 'education');
  }

  downloadResume(): void {
    const resumeUrl = this.profile()?.resumeUrl;
    if (resumeUrl) {
      window.open(resumeUrl, '_blank');
    }
  }

  trackBySkillId(index: number, skill: Skill): string {
    return skill.id;
  }

  trackByExperienceId(index: number, experience: Experience): string {
    return experience.id;
  }
} 