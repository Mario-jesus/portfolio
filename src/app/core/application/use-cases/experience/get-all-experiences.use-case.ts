import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Experience } from '../../../domain/entities/experience.entity';
import { ExperienceRepository } from '../../../domain/ports/experience.repository';

@Injectable({
  providedIn: 'root'
})
export class GetAllExperiencesUseCase {
  private experienceRepository = inject(ExperienceRepository);

  execute(): Observable<Experience[]> {
    return this.experienceRepository.getAll();
  }
} 