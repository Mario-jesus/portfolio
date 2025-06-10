import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Profile, LanguageLevel, AvailabilityStatus } from '../../domain/entities/profile.entity';
import { ProfileRepository } from '../../domain/ports/profile.repository';
import { SocialPlatform } from '../../domain/entities/contact.entity';

@Injectable({
  providedIn: 'root'
})
export class InMemoryProfileRepository extends ProfileRepository {
  private profile: Profile = {
    id: '1',
    firstName: 'Mario Jesús',
    lastName: 'Arias Hernández',
    title: 'Junior Full Stack Developer',
    bio: 'Desarrollador Full Stack apasionado por crear soluciones tecnológicas innovadoras. Con más de 4 años de experiencia en desarrollo web, especializado en Angular, Django y arquitecturas escalables.',
    summary: 'Profesional con sólida experiencia en desarrollo de aplicaciones web modernas, liderazgo de equipos y implementación de mejores prácticas de desarrollo. Enfocado en crear productos de alta calidad que generen valor real para los usuarios.',
    profileImageUrl: '/assets/profile/mario-jesus.jpg',
    resumeUrl: '/assets/documents/mario-jesus-cv.pdf',
    location: 'Ciudad de México, México',
    yearsOfExperience: 4,
    languages: [
      {
        name: 'Español',
        level: LanguageLevel.NATIVE,
        code: 'es'
      },
      {
        name: 'Inglés',
        level: LanguageLevel.ADVANCED,
        code: 'en'
      },
      {
        name: 'Francés',
        level: LanguageLevel.BASIC,
        code: 'fr'
      }
    ],
    interests: [
      'Inteligencia Artificial',
      'Arquitectura de Software',
      'Tecnologías Emergentes',
      'Fotografía',
      'Viajes',
      'Música'
    ],
    availability: AvailabilityStatus.AVAILABLE,
    contactInfo: {
      email: 'marioariashernandez@gmail.com',
      phone: '+52 55 1234 5678',
      location: 'Ciudad de México, México',
      availability: 'Disponible para proyectos freelance y oportunidades laborales',
      socialLinks: [
        {
          platform: SocialPlatform.LINKEDIN,
          url: 'https://linkedin.com/in/mario-arias-dev',
          username: 'mario-arias-dev'
        },
        {
          platform: SocialPlatform.GITHUB,
          url: 'https://github.com/mario-arias',
          username: 'mario-arias'
        },
        {
          platform: SocialPlatform.TWITTER,
          url: 'https://twitter.com/mario_arias',
          username: '@mario_arias'
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
} 