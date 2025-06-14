import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from '../../../domain/entities/project.entity';
import { ProjectRepository } from '../../../domain/ports/project.repository';

@Injectable({
  providedIn: 'root'
})
export class GetAllProjectsUseCase {
  private projectRepository = inject(ProjectRepository);

  execute(): Observable<Project[]> {
    return this.projectRepository.getAll();
  }
} 