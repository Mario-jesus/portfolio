import { Observable } from 'rxjs';
import { Experience, ExperienceType } from '../entities/experience.entity';

export abstract class ExperienceRepository {
  abstract getAll(): Observable<Experience[]>;
  abstract getById(id: string): Observable<Experience | null>;
  abstract getByType(type: ExperienceType): Observable<Experience[]>;
  abstract getWorkExperience(): Observable<Experience[]>;
  abstract getEducation(): Observable<Experience[]>;
  abstract getCertifications(): Observable<Experience[]>;
  abstract create(experience: Omit<Experience, 'id'>): Observable<Experience>;
  abstract update(id: string, experience: Partial<Experience>): Observable<Experience>;
  abstract delete(id: string): Observable<boolean>;
  abstract getByDateRange(startDate: Date, endDate: Date): Observable<Experience[]>;
} 