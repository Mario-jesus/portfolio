import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetAllProjectsUseCase } from '../../../core/application/use-cases/project/get-all-projects.use-case';
import { GetFeaturedProjectsUseCase } from '../../../core/application/use-cases/project/get-featured-projects.use-case';
import { GetResidencyInfoUseCase } from '../../../core/application/use-cases/residency/get-residency-info.use-case';
import { Project, ProjectCategory, ProjectStatus, ProjectContext } from '../../../core/domain/entities/project.entity';
import { ProfessionalResidency } from '../../../core/domain/entities/residency.entity';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  private getAllProjectsUseCase = inject(GetAllProjectsUseCase);
  private getFeaturedProjectsUseCase = inject(GetFeaturedProjectsUseCase);
  private getResidencyInfoUseCase = inject(GetResidencyInfoUseCase);

  projects = signal<Project[]>([]);
  filteredProjects = signal<Project[]>([]);
  residencyInfo = signal<ProfessionalResidency | null>(null);
  isLoading = signal(true);
  activeFilter = signal<'all' | 'featured' | ProjectCategory | ProjectStatus | ProjectContext>('all');
  searchQuery = signal('');

  readonly ProjectCategory = ProjectCategory;
  readonly ProjectStatus = ProjectStatus;
  readonly ProjectContext = ProjectContext;

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading.set(true);
    
    // Cargar proyectos académicos
    this.getAllProjectsUseCase.execute().subscribe({
      next: (projects) => {
        this.projects.set(projects);
        this.filteredProjects.set(projects);
        this.checkLoadingComplete();
      },
      error: (error) => {
        console.error('Error loading projects:', error);
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
    if (this.projects().length > 0 || this.residencyInfo()) {
      this.isLoading.set(false);
    }
  }

  setFilter(filter: 'all' | 'featured' | ProjectCategory | ProjectStatus | ProjectContext): void {
    this.activeFilter.set(filter);
    this.applyFilters();
  }

  onSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchQuery.set(target.value);
    this.applyFilters();
  }

  private applyFilters(): void {
    let filtered = [...this.projects()];
    const filter = this.activeFilter();
    const query = this.searchQuery().toLowerCase();

    // Aplicar filtro por categoría/estado/contexto
    if (filter !== 'all') {
      if (filter === 'featured') {
        filtered = filtered.filter(p => p.featured);
      } else if (Object.values(ProjectCategory).includes(filter as ProjectCategory)) {
        filtered = filtered.filter(p => p.category === filter);
      } else if (Object.values(ProjectStatus).includes(filter as ProjectStatus)) {
        filtered = filtered.filter(p => p.status === filter);
      } else if (Object.values(ProjectContext).includes(filter as ProjectContext)) {
        filtered = filtered.filter(p => p.context === filter);
      }
    }

    // Aplicar búsqueda
    if (query) {
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.technologies.some(tech => tech.toLowerCase().includes(query)) ||
        p.skillsApplied?.some(skill => skill.toLowerCase().includes(query)) ||
        p.learningOutcomes?.some(outcome => outcome.toLowerCase().includes(query))
      );
    }

    this.filteredProjects.set(filtered);
  }

  getCategoryLabel(category: ProjectCategory): string {
    switch (category) {
      case ProjectCategory.WEB_APPLICATION:
        return 'Aplicación Web';
      case ProjectCategory.MOBILE_APPLICATION:
        return 'Aplicación Móvil';
      case ProjectCategory.DESKTOP_APPLICATION:
        return 'Aplicación Desktop';
      case ProjectCategory.API:
        return 'API';
      case ProjectCategory.LIBRARY:
        return 'Librería';
      case ProjectCategory.RESEARCH:
        return 'Investigación';
      case ProjectCategory.PROTOTYPE:
        return 'Prototipo';
      default:
        return 'Otro';
    }
  }

  getContextLabel(context: ProjectContext): string {
    switch (context) {
      case ProjectContext.ACADEMIC:
        return 'Académico';
      case ProjectContext.PERSONAL:
        return 'Personal';
      case ProjectContext.RESIDENCY:
        return 'Residencia';
      case ProjectContext.INTERNSHIP:
        return 'Prácticas';
      case ProjectContext.FREELANCE:
        return 'Freelance';
      default:
        return 'Otro';
    }
  }

  getContextColor(context: ProjectContext): string {
    switch (context) {
      case ProjectContext.ACADEMIC:
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300';
      case ProjectContext.PERSONAL:
        return 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300';
      case ProjectContext.RESIDENCY:
        return 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300';
      case ProjectContext.INTERNSHIP:
        return 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300';
      case ProjectContext.FREELANCE:
        return 'bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300';
      default:
        return 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300';
    }
  }

  getStatusLabel(status: ProjectStatus): string {
    switch (status) {
      case ProjectStatus.COMPLETED:
        return 'Completado';
      case ProjectStatus.IN_PROGRESS:
        return 'En Progreso';
      case ProjectStatus.PLANNED:
        return 'Planeado';
      case ProjectStatus.ARCHIVED:
        return 'Archivado';
      default:
        return 'Desconocido';
    }
  }

  getStatusColor(status: ProjectStatus): string {
    switch (status) {
      case ProjectStatus.COMPLETED:
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300';
      case ProjectStatus.IN_PROGRESS:
        return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300';
      case ProjectStatus.PLANNED:
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300';
      case ProjectStatus.ARCHIVED:
        return 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300';
      default:
        return 'bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-300';
    }
  }

  getCategoryIcon(category: ProjectCategory): string {
    switch (category) {
      case ProjectCategory.WEB_APPLICATION:
        return 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9';
      case ProjectCategory.MOBILE_APPLICATION:
        return 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z';
      case ProjectCategory.DESKTOP_APPLICATION:
        return 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z';
      case ProjectCategory.API:
        return 'M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z';
      case ProjectCategory.LIBRARY:
        return 'M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M20 10v11M8 14h8';
      case ProjectCategory.RESEARCH:
        return 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z';
      case ProjectCategory.PROTOTYPE:
        return 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z';
      default:
        return 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10';
    }
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'short'
    }).format(date);
  }

  trackByProject(index: number, project: Project): string {
    return project.id;
  }

  openDemo(url: string): void {
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  openRepository(url: string): void {
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  // Métodos específicos para residencia profesional
  getAcademicProjectsCount(): number {
    return this.projects().filter(p => p.context === ProjectContext.ACADEMIC).length;
  }

  getCompletedProjectsCount(): number {
    return this.projects().filter(p => p.status === ProjectStatus.COMPLETED).length;
  }

  getFeaturedProjectsCount(): number {
    return this.projects().filter(p => p.featured).length;
  }

  getResidencyProjectsCount(): number {
    return this.projects().filter(p => p.context === ProjectContext.RESIDENCY).length;
  }

  getProjectsByContext(context: ProjectContext): Project[] {
    return this.projects().filter(p => p.context === context);
  }

  getTotalTechnologies(): number {
    const allTechs = this.projects().flatMap(p => p.technologies);
    return new Set(allTechs).size;
  }

  getProjectImpact(project: Project): string {
    return project.impact || 'Proyecto desarrollado como parte de la formación académica';
  }

  hasLearningOutcomes(project: Project): boolean {
    return !!(project.learningOutcomes && project.learningOutcomes.length > 0);
  }

  hasChallenges(project: Project): boolean {
    return !!(project.challenges && project.challenges.length > 0);
  }

  trackByIndex(index: number): number {
    return index;
  }
} 