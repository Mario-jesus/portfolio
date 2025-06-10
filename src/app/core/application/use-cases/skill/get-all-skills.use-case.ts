import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Skill } from '../../../domain/entities/skill.entity';
import { SkillRepository } from '../../../domain/ports/skill.repository';

@Injectable({
  providedIn: 'root'
})
export class GetAllSkillsUseCase {
  constructor(private skillRepository: SkillRepository) {}

  execute(): Observable<Skill[]> {
    return this.skillRepository.getAll();
  }
} 