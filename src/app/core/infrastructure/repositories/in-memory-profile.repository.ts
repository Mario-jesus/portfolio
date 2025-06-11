import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Profile, LanguageLevel, ResidencyAvailabilityStatus } from '../../domain/entities/profile.entity';
import { ProfileRepository } from '../../domain/ports/profile.repository';
import { SocialPlatform, ContactMethod } from '../../domain/entities/contact.entity';
import { ResidencyDuration } from '../../domain/entities/residency.entity';

@Injectable({
  providedIn: 'root'
})
export class InMemoryProfileRepository extends ProfileRepository {
  private profile: Profile = {
    id: '1',
    firstName: 'Mario Jesús',
    lastName: 'Arias Hernández',
    title: 'Estudiante de Ingeniería en Sistemas Computacionales',
    bio: 'Estudiante de Ingeniería en Sistemas Computacionales con pasión por el desarrollo de software y la innovación tecnológica. Busco una oportunidad de residencia profesional para aplicar mis conocimientos académicos en proyectos reales y contribuir al crecimiento de una organización.',
    summary: 'Estudiante de 9° semestre con sólidos conocimientos en desarrollo web, programación orientada a objetos y bases de datos. Experiencia en proyectos académicos usando Angular, Python, Django y metodologías ágiles. Enfocado en aprender, contribuir y desarrollar soluciones tecnológicas innovadoras.',
    profileImageUrl: '/assets/profile/mario-jesus.jpg',
    resumeUrl: '/assets/documents/mario-jesus-cv.pdf',
    academicCvUrl: '/assets/documents/mario-jesus-academic-cv.pdf',
    location: 'Balancán, Tabasco, México',
    currentSemester: 9,
    expectedGraduationDate: new Date('2026-07-15'),
    university: 'Instituto Tecnológico Superior de los Ríos',
    degree: 'Ingeniería en Sistemas Computacionales',
    gpa: 90.92,
    languages: [
      {
        name: 'Español',
        level: LanguageLevel.NATIVE,
        code: 'es'
      },
      {
        name: 'Inglés',
        level: LanguageLevel.BASIC,
        code: 'en'
      }
    ],
    interests: [
      'Desarrollo de Software',
      'Inteligencia Artificial',
      'Arquitectura de Software',
      'Tecnología Emergente',
      'Trading Algorítmico',
      'Desarrollo Web'
    ],
    academicInterests: [
      'Desarrollo Web Full Stack',
      'Inteligencia Artificial',
      'Arquitectura de Software',
      'Frontend',
      'Backend',
      'Desarrollo Móvil'
    ],
    availability: ResidencyAvailabilityStatus.SEEKING_RESIDENCY,
    residencyObjectives: {
      duration: ResidencyDuration.MEDIUM_TERM,
      preferredStartDate: new Date('2025-08-01'),
      preferredEndDate: new Date('2026-01-31'),
      objectives: [
        'Aplicar conocimientos teóricos en proyectos empresariales reales',
        'Desarrollar habilidades profesionales en un entorno de trabajo colaborativo',
        'Contribuir con soluciones innovadoras a desafíos tecnológicos',
        'Establecer conexiones profesionales en la industria tecnológica',
        'Completar exitosamente los requisitos de residencia profesional'
      ],
      areasOfInterest: [
        'Desarrollo Web Full Stack',
        'Desarrollo de APIs y Microservicios',
        'Análisis y Visualización de Datos',
        'Automatización de Procesos',
        'Desarrollo de Aplicaciones Móviles'
      ],
      whatCanContribute: [
        'Conocimientos actualizados en tecnologías modernas',
        'Perspectiva fresca e innovadora en la resolución de problemas',
        'Energía y motivación para aprender y contribuir',
        'Habilidades en desarrollo web con Angular y Python',
        'Capacidad de trabajo en equipo y adaptabilidad'
      ],
      learningGoals: [
        'Metodologías ágiles de desarrollo (Scrum, Kanban)',
        'Arquitectura de software empresarial y patrones de diseño',
        'Herramientas de DevOps y despliegue continuo',
        'Gestión de proyectos tecnológicos',
        'Habilidades de comunicación técnica y presentación'
      ]
    },
    contactInfo: {
      email: 'mariojesusariashernandez@gmail.com',
      phone: '+52 916 126 8346',
      location: 'Balancán, Tabasco, México',
      availability: 'Disponible para residencia profesional a partir de agosto 2025',
      preferredContactMethod: ContactMethod.PHONE,
      responseTime: '24-48 horas',
      socialLinks: [
        {
          platform: SocialPlatform.LINKEDIN,
          url: 'https://www.linkedin.com/in/mario-jes%C3%BAs-arias-hern%C3%A1ndez-b086b2319/',
          username: 'Mario Jesús'
        },
        {
          platform: SocialPlatform.GITHUB,
          url: 'https://github.com/Mario-jesus',
          username: 'Mario-jesus'
        },
        {
          platform: SocialPlatform.UNIVERSITY_EMAIL,
          url: 'mailto:mario.arias@tec.mx',
          username: 'mario.arias@tec.mx'
        }
      ]
    }
  };

  getProfile(): Observable<Profile> {
    return of({ ...this.profile }).pipe(delay(500));
  }

  updateProfile(profileUpdate: Partial<Profile>): Observable<Profile> {
    this.profile = { ...this.profile, ...profileUpdate };
    return of({ ...this.profile }).pipe(delay(600));
  }

  updateProfileImage(imageUrl: string): Observable<Profile> {
    this.profile = { ...this.profile, profileImageUrl: imageUrl };
    return of({ ...this.profile }).pipe(delay(400));
  }

  updateResume(resumeUrl: string): Observable<Profile> {
    this.profile = { ...this.profile, resumeUrl };
    return of({ ...this.profile }).pipe(delay(400));
  }

  updateAcademicCv(academicCvUrl: string): Observable<Profile> {
    this.profile = { ...this.profile, academicCvUrl };
    return of({ ...this.profile }).pipe(delay(400));
  }
} 