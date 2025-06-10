import { Observable } from 'rxjs';
import { Project, ProjectCategory, ProjectStatus } from '../entities/project.entity';

export abstract class ProjectRepository {
  abstract getAll(): Observable<Project[]>;
  abstract getById(id: string): Observable<Project | null>;
  abstract getFeatured(): Observable<Project[]>;
  abstract getByCategory(category: ProjectCategory): Observable<Project[]>;
  abstract getByStatus(status: ProjectStatus): Observable<Project[]>;
  abstract create(project: Omit<Project, 'id'>): Observable<Project>;
  abstract update(id: string, project: Partial<Project>): Observable<Project>;
  abstract delete(id: string): Observable<boolean>;
  abstract search(query: string): Observable<Project[]>;
} 