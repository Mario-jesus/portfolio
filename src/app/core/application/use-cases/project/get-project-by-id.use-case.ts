import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../../../domain/entities/project.entity';
import { ProjectRepository } from '../../../domain/ports/project.repository';

@Injectable({
  providedIn: 'root'
})
export class GetProjectByIdUseCase {
  constructor(private projectRepository: ProjectRepository) {}

  execute(id: string): Observable<Project | null> {
    if (!id || id.trim() === '') {
      throw new Error('Project ID is required');
    }
    
    return this.projectRepository.getById(id);
  }
} 