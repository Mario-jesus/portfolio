import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../../../domain/entities/project.entity';
import { ProjectRepository } from '../../../domain/ports/project.repository';

@Injectable({
  providedIn: 'root'
})
export class GetFeaturedProjectsUseCase {
  constructor(private projectRepository: ProjectRepository) {}

  execute(): Observable<Project[]> {
    return this.projectRepository.getFeatured();
  }
} 