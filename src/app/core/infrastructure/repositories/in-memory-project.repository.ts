import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Project, ProjectCategory, ProjectStatus, ProjectContext } from '../../domain/entities/project.entity';
import { ProjectRepository } from '../../domain/ports/project.repository';

@Injectable({
  providedIn: 'root'
})
export class InMemoryProjectRepository extends ProjectRepository {
  private projects: Project[] = [
    {
      id: '1',
      title: 'Sistema de Gestión Escolar',
      description: 'Plataforma web para gestión académica desarrollada como proyecto final de carrera. Incluye módulos para estudiantes, profesores, calificaciones y reportes académicos.',
      shortDescription: 'Sistema web de gestión académica con Angular y Spring Boot',
      technologies: ['Angular', 'Spring Boot', 'MySQL', 'Bootstrap', 'JWT'],
      imageUrl: '/assets/projects/project-1.svg',
      demoUrl: 'https://demo-gestion-escolar.example.com',
      repositoryUrl: 'https://github.com/mario-arias/gestion-escolar',
      startDate: new Date('2024-01-15'),
      endDate: new Date('2024-05-30'),
      status: ProjectStatus.COMPLETED,
      category: ProjectCategory.WEB_APPLICATION,
      featured: true,
      context: ProjectContext.ACADEMIC,
      skillsApplied: ['Desarrollo Frontend', 'Desarrollo Backend', 'Base de Datos', 'Autenticación JWT'],
      learningOutcomes: ['Arquitectura de aplicaciones web', 'Integración Frontend-Backend', 'Gestión de estados'],
      challenges: ['Implementación de roles y permisos', 'Optimización de consultas SQL', 'Responsive design'],
      impact: 'Proyecto utilizado como referencia para otros estudiantes de la carrera'
    },
    {
      id: '2',
      title: 'API de Inventario Universitario',
      description: 'API RESTful desarrollada para el control de inventario de laboratorios universitarios. Incluye autenticación, roles y reportes.',
      shortDescription: 'API REST para control de inventario con Node.js',
      technologies: ['Node.js', 'Express', 'PostgreSQL', 'JWT', 'Swagger'],
      imageUrl: '/assets/projects/project-2.svg',
      repositoryUrl: 'https://github.com/mario-arias/inventario-api',
      startDate: new Date('2024-02-01'),
      endDate: new Date('2024-04-15'),
      status: ProjectStatus.COMPLETED,
      category: ProjectCategory.API,
      featured: true,
      context: ProjectContext.ACADEMIC,
      skillsApplied: ['Node.js', 'Express', 'PostgreSQL', 'Autenticación JWT', 'Documentación API'],
      learningOutcomes: ['Diseño de APIs RESTful', 'Seguridad en aplicaciones web', 'Documentación técnica'],
      challenges: ['Optimización de consultas complejas', 'Implementación de middleware de seguridad'],
      impact: 'Sistema implementado en 3 laboratorios de la universidad'
    },
    {
      id: '3',
      title: 'App Móvil de Transporte Estudiantil',
      description: 'Aplicación móvil para tracking de transporte universitario con geolocalización en tiempo real y notificaciones.',
      shortDescription: 'App móvil para transporte estudiantil con React Native',
      technologies: ['React Native', 'TypeScript', 'Firebase', 'Google Maps API'],
      imageUrl: '/assets/projects/project-3.svg',
      demoUrl: 'https://github.com/mario-arias/transport-app/releases',
      repositoryUrl: 'https://github.com/mario-arias/transport-app',
      startDate: new Date('2024-08-01'),
      status: ProjectStatus.IN_PROGRESS,
      category: ProjectCategory.MOBILE_APPLICATION,
      featured: false,
      context: ProjectContext.PERSONAL,
      skillsApplied: ['React Native', 'TypeScript', 'Firebase', 'Geolocalización', 'Push Notifications'],
      learningOutcomes: ['Desarrollo móvil multiplataforma', 'Integración con servicios de mapas', 'Tiempo real'],
      challenges: ['Optimización de batería', 'Precisión de geolocalización', 'Sincronización en tiempo real'],
      impact: 'Proyecto en desarrollo para beneficiar a estudiantes del campus'
    }
  ];

  getAll(): Observable<Project[]> {
    return of([...this.projects]).pipe(delay(500));
  }

  getById(id: string): Observable<Project | null> {
    const project = this.projects.find(p => p.id === id) || null;
    return of(project).pipe(delay(300));
  }

  getFeatured(): Observable<Project[]> {
    const featured = this.projects.filter(p => p.featured);
    return of([...featured]).pipe(delay(400));
  }

  getByCategory(category: ProjectCategory): Observable<Project[]> {
    const filtered = this.projects.filter(p => p.category === category);
    return of([...filtered]).pipe(delay(400));
  }

  getByStatus(status: ProjectStatus): Observable<Project[]> {
    const filtered = this.projects.filter(p => p.status === status);
    return of([...filtered]).pipe(delay(400));
  }

  create(project: Omit<Project, 'id'>): Observable<Project> {
    const newProject: Project = {
      ...project,
      id: (this.projects.length + 1).toString()
    };
    this.projects.push(newProject);
    return of(newProject).pipe(delay(600));
  }

  update(id: string, projectUpdate: Partial<Project>): Observable<Project> {
    const index = this.projects.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error(`Project with id ${id} not found`);
    }
    
    this.projects[index] = { ...this.projects[index], ...projectUpdate };
    return of(this.projects[index]).pipe(delay(600));
  }

  delete(id: string): Observable<boolean> {
    const index = this.projects.findIndex(p => p.id === id);
    if (index === -1) {
      return of(false).pipe(delay(300));
    }
    
    this.projects.splice(index, 1);
    return of(true).pipe(delay(300));
  }

  search(query: string): Observable<Project[]> {
    const lowerQuery = query.toLowerCase();
    const filtered = this.projects.filter(p => 
      p.title.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.technologies.some(tech => tech.toLowerCase().includes(lowerQuery))
    );
    return of([...filtered]).pipe(delay(500));
  }
} 