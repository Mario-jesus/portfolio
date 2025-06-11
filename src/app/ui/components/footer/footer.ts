import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { 
  faHome, faUser, faFolderOpen, faBriefcase, faEnvelope,
  faPhone, faMapMarkerAlt, faHeart, faClock
} from '@fortawesome/free-solid-svg-icons';
import { 
  faLinkedin, faGithub, faTwitter, faInstagram, faFacebook, faYoutube 
} from '@fortawesome/free-brands-svg-icons';
import { GetProfileUseCase } from '../../../core/application/use-cases/profile/get-profile.use-case';
import { Profile } from '../../../core/domain/entities/profile.entity';
import { SocialPlatform, ContactMethod } from '../../../core/domain/entities/contact.entity';
import { ScrollService } from '../../../shared/services/scroll.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule, FaIconComponent],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class Footer implements OnInit {
  private getProfileUseCase = inject(GetProfileUseCase);
  private scrollService = inject(ScrollService);
  
  profile = signal<Profile | null>(null);
  isLoading = signal(true);
  currentYear = new Date().getFullYear();

  // FontAwesome icons
  faHome = faHome;
  faUser = faUser;
  faFolderOpen = faFolderOpen;
  faBriefcase = faBriefcase;
  faEnvelope = faEnvelope;
  faPhone = faPhone;
  faMapMarkerAlt = faMapMarkerAlt;
  faHeart = faHeart;
  faClock = faClock;
  faLinkedin = faLinkedin;
  faGithub = faGithub;
  faTwitter = faTwitter;
  faInstagram = faInstagram;
  faFacebook = faFacebook;
  faYoutube = faYoutube;
  
  navigationItems = [
    { label: 'Inicio', path: '/', icon: this.faHome },
    { label: 'Sobre Mí', path: '/about', icon: this.faUser },
    { label: 'Proyectos', path: '/projects', icon: this.faFolderOpen },
    { label: 'Experiencia', path: '/experience', icon: this.faBriefcase },
    { label: 'Contacto', path: '/contact', icon: this.faEnvelope }
  ];

  // Datos por defecto para mostrar mientras se cargan los datos reales
  private defaultProfile: Partial<Profile> = {
    firstName: 'Mario Jesús',
    lastName: 'Arias Hernández',
    title: 'Junior Full Stack Developer',
    summary: 'Desarrollador Full Stack apasionado por crear soluciones tecnológicas innovadoras con más de 4 años de experiencia.',
    contactInfo: {
      email: 'marioariashernandez@gmail.com',
      phone: '+52 55 1234 5678',
      location: 'Ciudad de México, México',
      availability: 'Disponible para residencia profesional',
      preferredContactMethod: ContactMethod.EMAIL,
      responseTime: '24-48 horas',
      socialLinks: [
        {
          platform: SocialPlatform.LINKEDIN,
          url: 'https://linkedin.com/in/mario-arias-student',
          username: 'mario-arias-student'
        },
        {
          platform: SocialPlatform.GITHUB,
          url: 'https://github.com/mario-arias',
          username: 'mario-arias'
        }
      ]
    },
    location: 'Ciudad de México, México'
  };

  ngOnInit(): void {
    this.loadProfile();
  }

  private loadProfile(): void {
    this.getProfileUseCase.execute().subscribe({
      next: (profile: Profile) => {
        this.profile.set(profile);
        this.isLoading.set(false);
      },
      error: (error: unknown) => {
        console.error('Error loading profile:', error);
        // En caso de error, usar datos por defecto
        this.profile.set(this.defaultProfile as Profile);
        this.isLoading.set(false);
      }
    });
  }

  // Métodos helper para obtener datos con fallback
  getFirstName(): string {
    return this.profile()?.firstName || this.defaultProfile.firstName || 'Mario Jesús';
  }

  getLastName(): string {
    return this.profile()?.lastName || this.defaultProfile.lastName || 'Arias Hernández';
  }

  getTitle(): string {
    return this.profile()?.title || this.defaultProfile.title || 'Junior Full Stack Developer';
  }

  getSummary(): string {
    return this.profile()?.summary || this.defaultProfile.summary || 'Desarrollador Full Stack apasionado por crear soluciones tecnológicas innovadoras.';
  }

  getEmail(): string | undefined {
    return this.profile()?.contactInfo?.email || this.defaultProfile.contactInfo?.email;
  }

  getPhone(): string | undefined {
    return this.profile()?.contactInfo?.phone || this.defaultProfile.contactInfo?.phone;
  }

  getLocation(): string | undefined {
    return this.profile()?.location || this.defaultProfile.location;
  }

  getAvailability(): string | undefined {
    return this.profile()?.contactInfo?.availability || this.defaultProfile.contactInfo?.availability;
  }

  getSocialLinks(): any[] {
    return this.profile()?.contactInfo?.socialLinks || this.defaultProfile.contactInfo?.socialLinks || [];
  }

  getSocialIcon(platform: SocialPlatform): any {
    const icons: Record<SocialPlatform, any> = {
      [SocialPlatform.LINKEDIN]: this.faLinkedin,
      [SocialPlatform.GITHUB]: this.faGithub,
      [SocialPlatform.TWITTER]: this.faTwitter,
      [SocialPlatform.INSTAGRAM]: this.faInstagram,
      [SocialPlatform.FACEBOOK]: this.faFacebook,
      [SocialPlatform.YOUTUBE]: this.faYoutube,
      [SocialPlatform.PORTFOLIO]: this.faGithub,
      [SocialPlatform.UNIVERSITY_EMAIL]: this.faEnvelope,
      [SocialPlatform.ACADEMIC_PROFILE]: this.faLinkedin,
      [SocialPlatform.OTHER]: this.faGithub
    };
    return icons[platform] || icons[SocialPlatform.OTHER];
  }

  onNavigate(): void {
    // Pequeño delay para que la navegación se complete antes del scroll
    setTimeout(() => {
      this.scrollService.scrollToTop();
    }, 100);
  }
}
