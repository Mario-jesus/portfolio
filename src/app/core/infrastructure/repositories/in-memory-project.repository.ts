import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Project, ProjectCategory, ProjectStatus } from '../../domain/entities/project.entity';
import { ProjectRepository } from '../../domain/ports/project.repository';

@Injectable({
  providedIn: 'root'
})
export class InMemoryProjectRepository extends ProjectRepository {
  private projects: Project[] = [
    {
      id: '1',
      title: 'E-Commerce Platform',
      description: 'Una plataforma completa de comercio electrónico desarrollada con Angular y Node.js. Incluye gestión de productos, carrito de compras, procesamiento de pagos y panel de administración.',
      shortDescription: 'Plataforma de e-commerce completa con Angular y Node.js',
      technologies: ['Angular', 'Node.js', 'MongoDB', 'Express', 'Stripe', 'TailwindCSS'],
      imageUrl: '/assets/projects/project-1.svg',
      demoUrl: 'https://demo-ecommerce.example.com',
      repositoryUrl: 'https://github.com/usuario/ecommerce-platform',
      startDate: new Date('2023-01-15'),
      endDate: new Date('2023-06-30'),
      status: ProjectStatus.COMPLETED,
      category: ProjectCategory.WEB_APPLICATION,
      featured: true
    },
    {
      id: '2',
      title: 'Task Management API',
      description: 'API RESTful para gestión de tareas y proyectos con autenticación JWT, roles de usuario y notificaciones en tiempo real.',
      shortDescription: 'API REST para gestión de tareas con autenticación JWT',
      technologies: ['Node.js', 'Express', 'PostgreSQL', 'JWT', 'Socket.io', 'Docker'],
      imageUrl: '/assets/projects/project-2.svg',
      repositoryUrl: 'https://github.com/usuario/task-management-api',
      startDate: new Date('2023-07-01'),
      endDate: new Date('2023-09-15'),
      status: ProjectStatus.COMPLETED,
      category: ProjectCategory.API,
      featured: true
    },
    {
      id: '3',
      title: 'Mobile Weather App',
      description: 'Aplicación móvil para consultar el clima con geolocalización, pronósticos extendidos y notificaciones push.',
      shortDescription: 'App móvil del clima con geolocalización',
      technologies: ['React Native', 'TypeScript', 'Redux', 'OpenWeather API'],
      imageUrl: '/assets/projects/project-3.svg',
      demoUrl: 'https://play.google.com/store/apps/weather-app',
      repositoryUrl: 'https://github.com/usuario/weather-app',
      startDate: new Date('2023-10-01'),
      status: ProjectStatus.IN_PROGRESS,
      category: ProjectCategory.MOBILE_APPLICATION,
      featured: false
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