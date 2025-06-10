import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProgressiveImageComponent } from '../../components/progressive-image/progressive-image';
import { GetProfileUseCase } from '../../../core/application/use-cases/profile/get-profile.use-case';
import { GetFeaturedProjectsUseCase } from '../../../core/application/use-cases/project/get-featured-projects.use-case';
import { GetAllSkillsUseCase } from '../../../core/application/use-cases/skill/get-all-skills.use-case';
import { Profile } from '../../../core/domain/entities/profile.entity';
import { Project } from '../../../core/domain/entities/project.entity';
import { Skill, SkillLevel } from '../../../core/domain/entities/skill.entity';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ProgressiveImageComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  profile = signal<Profile | null>(null);
  featuredProjects = signal<Project[]>([]);
  skills = signal<Skill[]>([]);
  imageKey = signal(0); // Para forzar recarga de imagen

  constructor(
    private getProfileUseCase: GetProfileUseCase,
    private getFeaturedProjectsUseCase: GetFeaturedProjectsUseCase,
    private getAllSkillsUseCase: GetAllSkillsUseCase
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    // Load profile
    this.getProfileUseCase.execute().subscribe({
      next: (profile) => this.profile.set(profile),
      error: (error) => console.error('Error loading profile:', error)
    });

    // Load featured projects
    this.getFeaturedProjectsUseCase.execute().subscribe({
      next: (projects) => this.featuredProjects.set(projects),
      error: (error) => console.error('Error loading featured projects:', error)
    });

    // Load skills
    this.getAllSkillsUseCase.execute().subscribe({
      next: (skills) => this.skills.set(skills),
      error: (error) => console.error('Error loading skills:', error)
    });
  }

  getSocialIcon(platform: string): string {
    const icons: { [key: string]: string } = {
      'github': '🐙',
      'linkedin': '💼',
      'twitter': '🐦',
      'email': '📧'
    };
    return icons[platform.toLowerCase()] || '🔗';
  }

  getSkillLevelColor(level: SkillLevel): string {
    switch (level) {
      case 'beginner': return 'bg-yellow-400';
      case 'intermediate': return 'bg-blue-400';
      case 'advanced': return 'bg-emerald-400';
      case 'expert': return 'bg-purple-400';
      default: return 'bg-gray-400';
    }
  }

  getSkillLevelText(level: SkillLevel): string {
    switch (level) {
      case 'beginner': return 'Principiante';
      case 'intermediate': return 'Intermedio';
      case 'advanced': return 'Avanzado';
      case 'expert': return 'Experto';
      default: return 'Sin definir';
    }
  }

  trackByProjectId(index: number, project: Project): string {
    return project.id;
  }

  trackBySkillId(index: number, skill: Skill): string {
    return skill.id;
  }

  // Método para demostrar el efecto de carga progresiva
  reloadImage(): void {
    this.imageKey.update(key => key + 1);
  }
}