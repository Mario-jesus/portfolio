import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetAllProjectsUseCase } from '../../../core/application/use-cases/project/get-all-projects.use-case';
import { GetFeaturedProjectsUseCase } from '../../../core/application/use-cases/project/get-featured-projects.use-case';
import { Project, ProjectCategory, ProjectStatus } from '../../../core/domain/entities/project.entity';

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

  projects = signal<Project[]>([]);
  filteredProjects = signal<Project[]>([]);
  isLoading = signal(true);
  activeFilter = signal<'all' | 'featured' | ProjectCategory | ProjectStatus>('all');
  searchQuery = signal('');

  readonly ProjectCategory = ProjectCategory;
  readonly ProjectStatus = ProjectStatus;

  ngOnInit(): void {
    this.loadProjects();
  }

  private loadProjects(): void {
    this.isLoading.set(true);
    
    this.getAllProjectsUseCase.execute().subscribe({
      next: (projects) => {
        this.projects.set(projects);
        this.filteredProjects.set(projects);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading projects:', error);
        this.isLoading.set(false);
      }
    });
  }

  setFilter(filter: 'all' | 'featured' | ProjectCategory | ProjectStatus): void {
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

    // Aplicar filtro por categoría/estado
    if (filter !== 'all') {
      if (filter === 'featured') {
        filtered = filtered.filter(p => p.featured);
      } else if (Object.values(ProjectCategory).includes(filter as ProjectCategory)) {
        filtered = filtered.filter(p => p.category === filter);
      } else if (Object.values(ProjectStatus).includes(filter as ProjectStatus)) {
        filtered = filtered.filter(p => p.status === filter);
      }
    }

    // Aplicar búsqueda
    if (query) {
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.technologies.some(tech => tech.toLowerCase().includes(query))
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
      default:
        return 'Otro';
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

  getCompletedProjectsCount(): number {
    return this.projects().filter(p => p.status === ProjectStatus.COMPLETED).length;
  }

  getFeaturedProjectsCount(): number {
    return this.projects().filter(p => p.featured).length;
  }
} 