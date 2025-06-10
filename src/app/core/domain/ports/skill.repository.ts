import { Observable } from 'rxjs';
import { Skill, SkillCategory, SkillLevel } from '../entities/skill.entity';

export abstract class SkillRepository {
  abstract getAll(): Observable<Skill[]>;
  abstract getById(id: string): Observable<Skill | null>;
  abstract getByCategory(category: SkillCategory): Observable<Skill[]>;
  abstract getByLevel(level: SkillLevel): Observable<Skill[]>;
  abstract getTechnicalSkills(): Observable<Skill[]>;
  abstract getSoftSkills(): Observable<Skill[]>;
  abstract create(skill: Omit<Skill, 'id'>): Observable<Skill>;
  abstract update(id: string, skill: Partial<Skill>): Observable<Skill>;
  abstract delete(id: string): Observable<boolean>;
  abstract search(query: string): Observable<Skill[]>;
} 