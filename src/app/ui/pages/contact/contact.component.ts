import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { 
  faEnvelope, faPhone, faMapMarkerAlt, faClock, faGraduationCap,
  faUniversity, faUser, faCalendarAlt, faAward, faInfoCircle
} from '@fortawesome/free-solid-svg-icons';
import { 
  faLinkedin, faGithub, faTwitter, faInstagram, faFacebook, faYoutube 
} from '@fortawesome/free-brands-svg-icons';
import { SendContactMessageUseCase, SendContactMessageRequest } from '../../../core/application/use-cases/contact/send-contact-message.use-case';
import { GetProfileUseCase } from '../../../core/application/use-cases/profile/get-profile.use-case';
import { GetResidencyInfoUseCase } from '../../../core/application/use-cases/residency/get-residency-info.use-case';
import { Profile } from '../../../core/domain/entities/profile.entity';
import { ProfessionalResidency } from '../../../core/domain/entities/residency.entity';
import { SocialPlatform, MessageType } from '../../../core/domain/entities/contact.entity';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FaIconComponent],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  private sendContactMessageUseCase = inject(SendContactMessageUseCase);
  private getProfileUseCase = inject(GetProfileUseCase);
  private getResidencyInfoUseCase = inject(GetResidencyInfoUseCase);
  private fb = inject(FormBuilder);

  // FontAwesome icons
  faEnvelope = faEnvelope;
  faPhone = faPhone;
  faMapMarkerAlt = faMapMarkerAlt;
  faClock = faClock;
  faGraduationCap = faGraduationCap;
  faUniversity = faUniversity;
  faUser = faUser;
  faCalendarAlt = faCalendarAlt;
  faAward = faAward;
  faInfoCircle = faInfoCircle;
  faLinkedin = faLinkedin;
  faGithub = faGithub;
  faTwitter = faTwitter;
  faInstagram = faInstagram;
  faFacebook = faFacebook;
  faYoutube = faYoutube;

  profile = signal<Profile | null>(null);
  residencyInfo = signal<ProfessionalResidency | null>(null);
  contactForm: FormGroup;
  isSubmitting = signal(false);
  isSubmitted = signal(false);
  submitError = signal<string | null>(null);

  readonly MessageType = MessageType;

  constructor() {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [''],
      company: [''],
      position: [''],
      messageType: [MessageType.RESIDENCY_PROPOSAL, [Validators.required]],
      subject: ['', [Validators.required, Validators.minLength(5)]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    // Cargar perfil académico
    this.getProfileUseCase.execute().subscribe({
      next: (profile) => {
        this.profile.set(profile);
      },
      error: (err) => {
        console.error('Error loading profile:', err);
      }
    });

    // Cargar información de residencia
    this.getResidencyInfoUseCase.execute().subscribe({
      next: (residency) => {
        this.residencyInfo.set(residency);
      },
      error: (err) => {
        console.error('Error loading residency info:', err);
      }
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid && !this.isSubmitting()) {
      this.isSubmitting.set(true);
      this.submitError.set(null);

      const formValue = this.contactForm.value;
      const request: SendContactMessageRequest = {
        name: formValue.name,
        email: formValue.email,
        subject: formValue.subject,
        message: formValue.message,
        messageType: formValue.messageType,
        phoneNumber: formValue.phoneNumber || undefined,
        company: formValue.company || undefined
      };

      // Simular envío (ya que no tenemos backend real)
      setTimeout(() => {
        try {
          // Aquí normalmente llamaríamos al use case
          // this.sendContactMessageUseCase.execute(request).subscribe(...)
          
          this.isSubmitted.set(true);
          this.contactForm.reset();
          // Resetear el tipo de mensaje por defecto
          this.contactForm.patchValue({ messageType: MessageType.RESIDENCY_PROPOSAL });
          console.log('Mensaje enviado:', request);
        } catch {
          this.submitError.set('Error al enviar el mensaje. Por favor, intenta nuevamente.');
        } finally {
          this.isSubmitting.set(false);
        }
      }, 2000);
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.contactForm.controls).forEach(key => {
      const control = this.contactForm.get(key);
      control?.markAsTouched();
    });
  }

  getFieldError(fieldName: string): string | null {
    const field = this.contactForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) {
        return `${this.getFieldLabel(fieldName)} es requerido`;
      }
      if (field.errors['email']) {
        return 'Formato de email inválido';
      }
      if (field.errors['minlength']) {
        const requiredLength = field.errors['minlength'].requiredLength;
        return `${this.getFieldLabel(fieldName)} debe tener al menos ${requiredLength} caracteres`;
      }
    }
    return null;
  }

  private getFieldLabel(fieldName: string): string {
    const labels: Record<string, string> = {
      name: 'Nombre',
      email: 'Email',
      phoneNumber: 'Teléfono',
      company: 'Empresa',
      position: 'Cargo',
      messageType: 'Tipo de consulta',
      subject: 'Asunto',
      message: 'Mensaje'
    };
    return labels[fieldName] || fieldName;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field?.errors && field.touched);
  }

  getMessageTypeLabel(type: MessageType): string {
    switch (type) {
      case MessageType.RESIDENCY_PROPOSAL:
        return 'Propuesta de Residencia Profesional';
      case MessageType.PROJECT_COLLABORATION:
        return 'Colaboración en Proyecto';
      case MessageType.ACADEMIC_INQUIRY:
        return 'Consulta Académica';
      case MessageType.GENERAL_INQUIRY:
        return 'Consulta General';
      case MessageType.NETWORKING:
        return 'Networking Profesional';
      default:
        return 'Otro';
    }
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
      [SocialPlatform.ACADEMIC_PROFILE]: this.faGraduationCap,
      [SocialPlatform.OTHER]: this.faInfoCircle
    };
    return icons[platform] || icons[SocialPlatform.OTHER];
  }

  resetForm(): void {
    this.isSubmitted.set(false);
    this.submitError.set(null);
    this.contactForm.reset();
    this.contactForm.patchValue({ messageType: MessageType.RESIDENCY_PROPOSAL });
  }

  openSocialLink(url: string): void {
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  // Métodos específicos para residencia profesional
  getCurrentSemester(): string {
    return '9°';
  }

  getUniversityName(): string {
    return 'Instituto Tecnológico Superior de los Ríos';
  }

  getCareerName(): string {
    return 'Ingeniería en Sistemas Computacionales';
  }

  getAcademicEmail(): string {
    const profile = this.profile();
    return profile?.contactInfo?.email || 'mario.arias@estudiante.tecnm.mx';
  }

  getPersonalEmail(): string {
    const profile = this.profile();
    return profile?.contactInfo?.email || 'mario.arias.dev@gmail.com';
  }

  getPhoneNumber(): string {
    const profile = this.profile();
    return profile?.contactInfo?.phone || '+52 55 1234 5678';
  }

  getLocation(): string {
    const profile = this.profile();
    return profile?.location || 'Balancán, Tabasco, México';
  }

  getAvailabilityStatus(): string {
    return 'Disponible para residencia profesional';
  }

  getPreferredContactMethod(): string {
    const profile = this.profile();
    return profile?.contactInfo?.preferredContactMethod || 'Email académico';
  }

  getResponseTime(): string {
    const profile = this.profile();
    return profile?.contactInfo?.responseTime || '24-48 horas';
  }

  isAvailableForResidency(): boolean {
    return true; // Estudiante de 9° semestre listo para residencia
  }

  getResidencyAreas(): string[] {
    const residency = this.residencyInfo();
    return residency?.areasOfInterest?.map(area => this.getAreaLabel(area)) || [
      'Desarrollo Web',
      'Desarrollo Móvil',
      'Desarrollo de Software',
    ];
  }

  private getAreaLabel(area: string): string {
    const labels: Record<string, string> = {
      'software_development': 'Desarrollo de Software',
      'frontend_development': 'Desarrollo Frontend',
      'backend_development': 'Desarrollo Backend',
      'web_development': 'Desarrollo Web',
      'mobile_development': 'Desarrollo Móvil',
      'data_science': 'Ciencia de Datos',
      'artificial_intelligence': 'Inteligencia Artificial',
      'cybersecurity': 'Ciberseguridad',
      'devops': 'DevOps',
      'ui_ux_design': 'Diseño UI/UX',
      'project_management': 'Gestión de Proyectos',
      'quality_assurance': 'Aseguramiento de Calidad'
    };
    return labels[area] || area;
  }

  getExpectedGraduationDate(): string {
    return 'Julio 2026';
  }

  getResidencyDuration(): string {
    return '4-6 meses';
  }

  getAcademicAchievements(): string[] {
    return [
      'Promedio general: 90.92/100',
      '94% de créditos completados',
      'Participación en proyectos académicos'
    ];
  }
} 