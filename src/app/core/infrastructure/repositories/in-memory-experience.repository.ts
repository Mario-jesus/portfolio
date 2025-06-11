import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Experience, ExperienceType } from '../../domain/entities/experience.entity';
import { ExperienceRepository } from '../../domain/ports/experience.repository';

@Injectable({
  providedIn: 'root'
})
export class InMemoryExperienceRepository extends ExperienceRepository {
  private experiences: Experience[] = [
    {
      id: '1',
      title: 'Junior Full Stack Developer',
      company: 'TechCorp Solutions',
      location: 'Ciudad de México, México',
      description: 'Desarrollo de aplicaciones web escalables utilizando tecnologías modernas. Liderazgo de equipo de 5 desarrolladores.',
      responsibilities: [
        'Desarrollo de aplicaciones web con Angular y Node.js',
        'Diseño de arquitecturas de software escalables',
        'Mentoring de desarrolladores junior',
        'Implementación de mejores prácticas de desarrollo'
      ],
      achievements: [
        'Reducción del tiempo de carga de aplicaciones en 40%',
        'Implementación de CI/CD que redujo bugs en producción en 60%',
        'Liderazgo exitoso de 3 proyectos críticos'
      ],
      technologies: ['Angular', 'Node.js', 'TypeScript', 'MongoDB', 'AWS', 'Docker'],
      startDate: new Date('2022-03-01'),
      type: ExperienceType.WORK,
      companyLogo: '/assets/companies/techcorp.png',
      companyUrl: 'https://techcorp.example.com'
    },
    {
      id: '2',
      title: 'Full Stack Developer',
      company: 'StartupXYZ',
      location: 'Guadalajara, México',
      description: 'Desarrollo de MVP y productos digitales para startup en crecimiento.',
      responsibilities: [
        'Desarrollo frontend con React y Angular',
        'Desarrollo backend con Node.js y Python',
        'Integración con APIs de terceros',
        'Optimización de bases de datos'
      ],
      achievements: [
        'Desarrollo completo de 2 productos desde cero',
        'Implementación de sistema de pagos con Stripe',
        'Optimización que mejoró performance en 50%'
      ],
      technologies: ['React', 'Angular', 'Node.js', 'Python', 'PostgreSQL', 'Stripe'],
      startDate: new Date('2020-06-15'),
      endDate: new Date('2022-02-28'),
      type: ExperienceType.WORK,
      companyLogo: '/assets/companies/startupxyz.png'
    },
    {
      id: '3',
      title: 'Ingeniería en Sistemas Computacionales',
      company: 'Instituto Tecnológico Superior de los Ríos',
      location: 'Balancán, Tabasco, México',
      description: 'Licenciatura en Ingeniería en Sistemas Computacionales.',
      responsibilities: [
        'Desarrollo de proyectos académicos',
        'Investigación en inteligencia artificial',
        'Participación en competencias de programación'
      ],
      achievements: [
        'Graduado con mención honorífica',
        'Primer lugar en competencia nacional de programación',
        'Tesis sobre machine learning aplicado a e-commerce'
      ],
      technologies: ['Java', 'C++', 'Python', 'SQL', 'Machine Learning'],
      startDate: new Date('2021-08-01'),
      type: ExperienceType.EDUCATION,
      companyLogo: '/assets/universities/utm.png'
    }
  ];

  getAll(): Observable<Experience[]> {
    return of([...this.experiences]).pipe(delay(500));
  }

  getById(id: string): Observable<Experience | null> {
    const experience = this.experiences.find(e => e.id === id) || null;
    return of(experience).pipe(delay(300));
  }

  getByType(type: ExperienceType): Observable<Experience[]> {
    const filtered = this.experiences.filter(e => e.type === type);
    return of([...filtered]).pipe(delay(400));
  }

  getWorkExperience(): Observable<Experience[]> {
    return this.getByType(ExperienceType.WORK);
  }

  getEducation(): Observable<Experience[]> {
    return this.getByType(ExperienceType.EDUCATION);
  }

  getCertifications(): Observable<Experience[]> {
    return this.getByType(ExperienceType.CERTIFICATION);
  }

  create(experience: Omit<Experience, 'id'>): Observable<Experience> {
    const newExperience: Experience = {
      ...experience,
      id: (this.experiences.length + 1).toString()
    };
    this.experiences.push(newExperience);
    return of(newExperience).pipe(delay(600));
  }

  update(id: string, experienceUpdate: Partial<Experience>): Observable<Experience> {
    const index = this.experiences.findIndex(e => e.id === id);
    if (index === -1) {
      throw new Error(`Experience with id ${id} not found`);
    }
    
    this.experiences[index] = { ...this.experiences[index], ...experienceUpdate };
    return of(this.experiences[index]).pipe(delay(600));
  }

  delete(id: string): Observable<boolean> {
    const index = this.experiences.findIndex(e => e.id === id);
    if (index === -1) {
      return of(false).pipe(delay(300));
    }
    
    this.experiences.splice(index, 1);
    return of(true).pipe(delay(300));
  }

  getByDateRange(startDate: Date, endDate: Date): Observable<Experience[]> {
    const filtered = this.experiences.filter(e => 
      e.startDate >= startDate && 
      (e.endDate ? e.endDate <= endDate : new Date() <= endDate)
    );
    return of([...filtered]).pipe(delay(400));
  }
} 