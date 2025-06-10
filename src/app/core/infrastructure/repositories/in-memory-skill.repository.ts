import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Skill, SkillCategory, SkillLevel } from '../../domain/entities/skill.entity';
import { SkillRepository } from '../../domain/ports/skill.repository';

@Injectable({
  providedIn: 'root'
})
export class InMemorySkillRepository extends SkillRepository {
  private skills: Skill[] = [
    {
      id: '1',
      name: 'Angular',
      category: SkillCategory.FRAMEWORK,
      level: SkillLevel.EXPERT,
      description: 'Framework para desarrollo de aplicaciones web SPA',
      iconUrl: '/assets/skills/angular.svg',
      yearsOfExperience: 4,
      certifications: ['Angular Certified Developer']
    },
    {
      id: '2',
      name: 'TypeScript',
      category: SkillCategory.PROGRAMMING_LANGUAGE,
      level: SkillLevel.ADVANCED,
      description: 'Superset de JavaScript con tipado estático',
      iconUrl: '/assets/skills/typescript.svg',
      yearsOfExperience: 4
    },
    {
      id: '3',
      name: 'Node.js',
      category: SkillCategory.FRAMEWORK,
      level: SkillLevel.ADVANCED,
      description: 'Runtime de JavaScript para desarrollo backend',
      iconUrl: '/assets/skills/nodejs.svg',
      yearsOfExperience: 3
    },
    {
      id: '4',
      name: 'MongoDB',
      category: SkillCategory.DATABASE,
      level: SkillLevel.INTERMEDIATE,
      description: 'Base de datos NoSQL orientada a documentos',
      iconUrl: '/assets/skills/mongodb.svg',
      yearsOfExperience: 2
    },
    {
      id: '5',
      name: 'Docker',
      category: SkillCategory.TOOL,
      level: SkillLevel.INTERMEDIATE,
      description: 'Plataforma de contenedores para desarrollo y despliegue',
      iconUrl: '/assets/skills/docker.svg',
      yearsOfExperience: 2
    },
    {
      id: '6',
      name: 'Liderazgo',
      category: SkillCategory.SOFT_SKILL,
      level: SkillLevel.ADVANCED,
      description: 'Capacidad de liderar equipos y proyectos',
      yearsOfExperience: 3
    },
    {
      id: '7',
      name: 'AWS',
      category: SkillCategory.CLOUD,
      level: SkillLevel.INTERMEDIATE,
      description: 'Servicios de computación en la nube de Amazon',
      iconUrl: '/assets/skills/aws.svg',
      yearsOfExperience: 2,
      certifications: ['AWS Solutions Architect Associate']
    }
  ];

  getAll(): Observable<Skill[]> {
    return of([...this.skills]).pipe(delay(500));
  }

  getById(id: string): Observable<Skill | null> {
    const skill = this.skills.find(s => s.id === id) || null;
    return of(skill).pipe(delay(300));
  }

  getByCategory(category: SkillCategory): Observable<Skill[]> {
    const filtered = this.skills.filter(s => s.category === category);
    return of([...filtered]).pipe(delay(400));
  }

  getByLevel(level: SkillLevel): Observable<Skill[]> {
    const filtered = this.skills.filter(s => s.level === level);
    return of([...filtered]).pipe(delay(400));
  }

  getTechnicalSkills(): Observable<Skill[]> {
    const technicalCategories = [
      SkillCategory.PROGRAMMING_LANGUAGE,
      SkillCategory.FRAMEWORK,
      SkillCategory.DATABASE,
      SkillCategory.TOOL,
      SkillCategory.CLOUD
    ];
    const filtered = this.skills.filter(s => technicalCategories.includes(s.category));
    return of([...filtered]).pipe(delay(400));
  }

  getSoftSkills(): Observable<Skill[]> {
    const filtered = this.skills.filter(s => s.category === SkillCategory.SOFT_SKILL);
    return of([...filtered]).pipe(delay(400));
  }

  create(skill: Omit<Skill, 'id'>): Observable<Skill> {
    const newSkill: Skill = {
      ...skill,
      id: (this.skills.length + 1).toString()
    };
    this.skills.push(newSkill);
    return of(newSkill).pipe(delay(600));
  }

  update(id: string, skillUpdate: Partial<Skill>): Observable<Skill> {
    const index = this.skills.findIndex(s => s.id === id);
    if (index === -1) {
      throw new Error(`Skill with id ${id} not found`);
    }
    
    this.skills[index] = { ...this.skills[index], ...skillUpdate };
    return of(this.skills[index]).pipe(delay(600));
  }

  delete(id: string): Observable<boolean> {
    const index = this.skills.findIndex(s => s.id === id);
    if (index === -1) {
      return of(false).pipe(delay(300));
    }
    
    this.skills.splice(index, 1);
    return of(true).pipe(delay(300));
  }

  search(query: string): Observable<Skill[]> {
    const lowerQuery = query.toLowerCase();
    const filtered = this.skills.filter(s => 
      s.name.toLowerCase().includes(lowerQuery) ||
      (s.description && s.description.toLowerCase().includes(lowerQuery))
    );
    return of([...filtered]).pipe(delay(500));
  }
} 