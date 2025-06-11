import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Skill } from '../../../domain/entities/skill.entity';
import { SkillRepository } from '../../../domain/ports/skill.repository';

@Injectable({
  providedIn: 'root'
})
export class GetAllSkillsUseCase {
  private skillRepository = inject(SkillRepository);

  execute(): Observable<Skill[]> {
    return this.skillRepository.getAll();
  }
} 