import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { 
  faDownload, faComments, faCode, faDatabase, faServer, faMobile, 
  faDesktop, faCloud, faCog, faShieldAlt, faPalette, faRocket,
  faLaptopCode, faGlobe, faFlask, faBook, faLightbulb, faMicrochip
} from '@fortawesome/free-solid-svg-icons';
import { 
  faLinkedin, faGithub, faTwitter, faInstagram, faFacebook, faYoutube,
  faJs, faHtml5, faCss3Alt, faReact, faAngular, faVuejs, faNodeJs,
  faPython, faJava, faPhp, faLaravel, faBootstrap, faGitAlt, faDocker,
  faAws, faGoogle, faMicrosoft, faApple, faLinux, faWindows, faAndroid
} from '@fortawesome/free-brands-svg-icons';
import { ProgressiveImageComponent } from '../../components/progressive-image/progressive-image';
import { GetProfileUseCase } from '../../../core/application/use-cases/profile/get-profile.use-case';
import { GetFeaturedProjectsUseCase } from '../../../core/application/use-cases/project/get-featured-projects.use-case';
import { GetAllSkillsUseCase } from '../../../core/application/use-cases/skill/get-all-skills.use-case';
import { GetResidencyInfoUseCase } from '../../../core/application/use-cases/residency/get-residency-info.use-case';
import { Profile, ResidencyAvailabilityStatus } from '../../../core/domain/entities/profile.entity';
import { Project } from '../../../core/domain/entities/project.entity';
import { Skill, SkillLevel } from '../../../core/domain/entities/skill.entity';
import { ProfessionalResidency, ResidencyArea } from '../../../core/domain/entities/residency.entity';
import { SocialPlatform } from '../../../core/domain/entities/contact.entity';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ProgressiveImageComponent, FaIconComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private getProfileUseCase = inject(GetProfileUseCase);
  private getFeaturedProjectsUseCase = inject(GetFeaturedProjectsUseCase);
  private getAllSkillsUseCase = inject(GetAllSkillsUseCase);
  private getResidencyInfoUseCase = inject(GetResidencyInfoUseCase);

  // FontAwesome icons - Solid
  faDownload = faDownload;
  faComments = faComments;
  faCode = faCode;
  faDatabase = faDatabase;
  faServer = faServer;
  faMobile = faMobile;
  faDesktop = faDesktop;
  faCloud = faCloud;
  faCog = faCog;
  faShieldAlt = faShieldAlt;
  faPalette = faPalette;
  faRocket = faRocket;
  faLaptopCode = faLaptopCode;
  faGlobe = faGlobe;
  faFlask = faFlask;
  faBook = faBook;
  faLightbulb = faLightbulb;
  faMicrochip = faMicrochip;

  // FontAwesome icons - Brands
  faLinkedin = faLinkedin;
  faGithub = faGithub;
  faTwitter = faTwitter;
  faInstagram = faInstagram;
  faFacebook = faFacebook;
  faYoutube = faYoutube;
  faJs = faJs;
  faHtml5 = faHtml5;
  faCss3Alt = faCss3Alt;
  faReact = faReact;
  faAngular = faAngular;
  faVuejs = faVuejs;
  faNodeJs = faNodeJs;
  faPython = faPython;
  faJava = faJava;
  faPhp = faPhp;
  faLaravel = faLaravel;
  faBootstrap = faBootstrap;
  faGitAlt = faGitAlt;
  faDocker = faDocker;
  faAws = faAws;
  faGoogle = faGoogle;
  faMicrosoft = faMicrosoft;
  faApple = faApple;
  faLinux = faLinux;
  faWindows = faWindows;
  faAndroid = faAndroid;

  profile = signal<Profile | null>(null);
  featuredProjects = signal<Project[]>([]);
  skills = signal<Skill[]>([]);
  residencyInfo = signal<ProfessionalResidency | null>(null);
  imageKey = signal(0); // Para forzar recarga de imagen
  isLoading = signal(false);
  error = signal<string | null>(null);

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading.set(true);
    this.error.set(null);

    // Load profile
    this.getProfileUseCase.execute().subscribe({
      next: (profile) => this.profile.set(profile),
      error: (error) => {
        console.error('Error loading profile:', error);
        this.error.set('Error al cargar el perfil');
      }
    });

    // Load featured projects
    this.getFeaturedProjectsUseCase.execute().subscribe({
      next: (projects) => this.featuredProjects.set(projects),
      error: (error) => {
        console.error('Error loading featured projects:', error);
        this.error.set('Error al cargar proyectos');
      }
    });

    // Load skills
    this.getAllSkillsUseCase.execute().subscribe({
      next: (skills) => this.skills.set(skills),
      error: (error) => {
        console.error('Error loading skills:', error);
        this.error.set('Error al cargar habilidades');
      }
    });

    // Load residency info
    this.getResidencyInfoUseCase.execute().subscribe({
      next: (residency) => {
        this.residencyInfo.set(residency);
        this.isLoading.set(false);
      },
      error: (error) => {
        console.error('Error loading residency info:', error);
        this.error.set('Error al cargar información de residencia');
        this.isLoading.set(false);
      }
    });
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
      [SocialPlatform.UNIVERSITY_EMAIL]: this.faComments,
      [SocialPlatform.ACADEMIC_PROFILE]: this.faLinkedin,
      [SocialPlatform.OTHER]: this.faGithub
    };
    return icons[platform] || icons[SocialPlatform.OTHER];
  }

  getTechnologyIcon(skillName: string): any {
    const name = skillName.toLowerCase();
    
    // Mapeo de tecnologías a iconos de FontAwesome
    const techIcons: Record<string, any> = {
      // Frontend
      'javascript': this.faJs,
      'js': this.faJs,
      'typescript': this.faJs,
      'ts': this.faJs,
      'html': this.faHtml5,
      'html5': this.faHtml5,
      'css': this.faCss3Alt,
      'css3': this.faCss3Alt,
      'react': this.faReact,
      'reactjs': this.faReact,
      'angular': this.faAngular,
      'vue': this.faVuejs,
      'vuejs': this.faVuejs,
      'bootstrap': this.faBootstrap,
      
      // Backend
      'node': this.faNodeJs,
      'nodejs': this.faNodeJs,
      'node.js': this.faNodeJs,
      'python': this.faPython,
      'java': this.faJava,
      'php': this.faPhp,
      'laravel': this.faLaravel,
      
      // Bases de datos
      'mysql': this.faDatabase,
      'postgresql': this.faDatabase,
      'mongodb': this.faDatabase,
      'sql': this.faDatabase,
      'database': this.faDatabase,
      'db': this.faDatabase,
      
      // DevOps y Cloud
      'docker': this.faDocker,
      'aws': this.faAws,
      'azure': this.faMicrosoft,
      'google cloud': this.faGoogle,
      'gcp': this.faGoogle,
      'cloud': this.faCloud,
      'kubernetes': this.faServer,
      
      // Herramientas
      'git': this.faGitAlt,
      'github': this.faGithub,
      'gitlab': this.faGitAlt,
      
      // Sistemas operativos
      'linux': this.faLinux,
      'ubuntu': this.faLinux,
      'windows': this.faWindows,
      'macos': this.faApple,
      'ios': this.faApple,
      'android': this.faAndroid,
      
      // Categorías generales
      'frontend': this.faDesktop,
      'backend': this.faServer,
      'fullstack': this.faLaptopCode,
      'full stack': this.faLaptopCode,
      'mobile': this.faMobile,
      'web': this.faGlobe,
      'api': this.faCog,
      'microservices': this.faMicrochip,
      'testing': this.faFlask,
      'design': this.faPalette,
      'ui/ux': this.faPalette,
      'devops': this.faRocket,
      'security': this.faShieldAlt,
      'cybersecurity': this.faShieldAlt,
      'machine learning': this.faLightbulb,
      'ai': this.faLightbulb,
      'data science': this.faBook
    };

    // Buscar coincidencias exactas o parciales
    for (const [key, icon] of Object.entries(techIcons)) {
      if (name.includes(key) || key.includes(name)) {
        return icon;
      }
    }

    // Icono por defecto
    return this.faCode;
  }

  getTechnologyColor(skillName: string): string {
    const name = skillName.toLowerCase();
    
    // Mapeo de tecnologías a colores específicos
    const techColors: Record<string, string> = {
      // Frontend - Colores oficiales de las tecnologías
      'javascript': 'text-yellow-500',
      'js': 'text-yellow-500',
      'typescript': 'text-blue-600',
      'ts': 'text-blue-600',
      'html': 'text-orange-600',
      'html5': 'text-orange-600',
      'css': 'text-blue-500',
      'css3': 'text-blue-500',
      'react': 'text-cyan-400',
      'reactjs': 'text-cyan-400',
      'angular': 'text-red-600',
      'vue': 'text-green-500',
      'vuejs': 'text-green-500',
      'bootstrap': 'text-purple-600',
      
      // Backend
      'node': 'text-green-600',
      'nodejs': 'text-green-600',
      'node.js': 'text-green-600',
      'python': 'text-blue-500',
      'java': 'text-orange-500',
      'php': 'text-indigo-600',
      'laravel': 'text-red-500',
      
      // Bases de datos
      'mysql': 'text-blue-600',
      'postgresql': 'text-blue-700',
      'mongodb': 'text-green-600',
      'sql': 'text-blue-600',
      'database': 'text-blue-600',
      'db': 'text-blue-600',
      
      // DevOps y Cloud
      'docker': 'text-blue-500',
      'aws': 'text-orange-500',
      'azure': 'text-blue-600',
      'google cloud': 'text-blue-500',
      'gcp': 'text-blue-500',
      'cloud': 'text-sky-500',
      'kubernetes': 'text-blue-600',
      
      // Herramientas
      'git': 'text-orange-600',
      'github': 'text-gray-800 dark:text-white',
      'gitlab': 'text-orange-600',
      
      // Sistemas operativos
      'linux': 'text-yellow-500',
      'ubuntu': 'text-orange-500',
      'windows': 'text-blue-600',
      'macos': 'text-gray-600',
      'ios': 'text-gray-600',
      'android': 'text-green-500',
      
      // Categorías generales
      'frontend': 'text-purple-500',
      'backend': 'text-green-600',
      'fullstack': 'text-blue-500',
      'full stack': 'text-blue-500',
      'mobile': 'text-pink-500',
      'web': 'text-emerald-500',
      'api': 'text-indigo-500',
      'microservices': 'text-purple-600',
      'testing': 'text-green-500',
      'design': 'text-pink-500',
      'ui/ux': 'text-pink-500',
      'devops': 'text-orange-500',
      'security': 'text-red-600',
      'cybersecurity': 'text-red-600',
      'machine learning': 'text-yellow-500',
      'ai': 'text-yellow-500',
      'data science': 'text-blue-600'
    };

    // Buscar coincidencias exactas o parciales
    for (const [key, color] of Object.entries(techColors)) {
      if (name.includes(key) || key.includes(name)) {
        return color;
      }
    }

    // Color por defecto
    return 'text-slate-600 dark:text-slate-300';
  }

  getSkillLevelColor(level: SkillLevel): string {
    const colors = {
      [SkillLevel.BEGINNER]: 'bg-yellow-400',
      [SkillLevel.INTERMEDIATE]: 'bg-blue-400',
      [SkillLevel.ADVANCED]: 'bg-emerald-400',
      [SkillLevel.EXPERT]: 'bg-purple-400'
    };
    return colors[level] || 'bg-gray-400';
  }

  getSkillLevelText(level: SkillLevel): string {
    const levels = {
      [SkillLevel.BEGINNER]: 'Principiante',
      [SkillLevel.INTERMEDIATE]: 'Intermedio',
      [SkillLevel.ADVANCED]: 'Avanzado',
      [SkillLevel.EXPERT]: 'Experto'
    };
    return levels[level] || 'Sin definir';
  }

  getAvailabilityText(status: ResidencyAvailabilityStatus): string {
    switch (status) {
      case ResidencyAvailabilityStatus.SEEKING_RESIDENCY:
        return 'Buscando Residencia Profesional';
      case ResidencyAvailabilityStatus.AVAILABLE_SOON:
        return 'Disponible Pronto';
      case ResidencyAvailabilityStatus.IN_RESIDENCY:
        return 'En Residencia';
      case ResidencyAvailabilityStatus.COMPLETED_RESIDENCY:
        return 'Residencia Completada';
      default:
        return 'Estado no definido';
    }
  }

  getAvailabilityColor(status: ResidencyAvailabilityStatus): string {
    switch (status) {
      case ResidencyAvailabilityStatus.SEEKING_RESIDENCY:
        return 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300';
      case ResidencyAvailabilityStatus.AVAILABLE_SOON:
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300';
      case ResidencyAvailabilityStatus.IN_RESIDENCY:
        return 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800 text-purple-700 dark:text-purple-300';
      case ResidencyAvailabilityStatus.COMPLETED_RESIDENCY:
        return 'bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300';
      default:
        return 'bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300';
    }
  }

  getAreaText(area: ResidencyArea): string {
    const areas: Record<ResidencyArea, string> = {
      [ResidencyArea.SOFTWARE_DEVELOPMENT]: 'Desarrollo de Software',
      [ResidencyArea.BACKEND_DEVELOPMENT]: 'Desarrollo Backend',
      [ResidencyArea.FRONTEND_DEVELOPMENT]: 'Desarrollo Frontend',
      [ResidencyArea.WEB_DEVELOPMENT]: 'Desarrollo Web',
      [ResidencyArea.MOBILE_DEVELOPMENT]: 'Desarrollo Móvil',
      [ResidencyArea.DATA_SCIENCE]: 'Ciencia de Datos',
      [ResidencyArea.ARTIFICIAL_INTELLIGENCE]: 'Inteligencia Artificial',
      [ResidencyArea.CYBERSECURITY]: 'Ciberseguridad',
      [ResidencyArea.DEVOPS]: 'DevOps',
      [ResidencyArea.UI_UX_DESIGN]: 'Diseño UI/UX',
      [ResidencyArea.PROJECT_MANAGEMENT]: 'Gestión de Proyectos',
      [ResidencyArea.QUALITY_ASSURANCE]: 'Aseguramiento de Calidad',
      [ResidencyArea.RESEARCH_DEVELOPMENT]: 'Investigación y Desarrollo',
      [ResidencyArea.OTHER]: 'Otro'
    };
    return areas[area] || area;
  }

  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'long'
    }).format(date);
  }

  formatDuration(months: number): string {
    if (months === 1) return '1 mes';
    if (months < 12) return `${months} meses`;
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    if (remainingMonths === 0) return years === 1 ? '1 año' : `${years} años`;
    return `${years} año${years > 1 ? 's' : ''} y ${remainingMonths} mes${remainingMonths > 1 ? 'es' : ''}`;
  }

  downloadCV(): void {
    const cvUrl = this.profile()?.academicCvUrl || this.profile()?.resumeUrl;
    if (cvUrl) {
      window.open(cvUrl, '_blank');
    }
  }

  navigateToResidency(): void {
    // En lugar de navegar a /residencia, podemos hacer scroll a la sección de residencia
    const residencySection = document.getElementById('residency-section');
    if (residencySection) {
      residencySection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  trackByProjectId(index: number, project: Project): string {
    return project.id;
  }

  trackBySkillId(index: number, skill: Skill): string {
    return skill.id;
  }

  trackByIndex(index: number): number {
    return index;
  }

  // Método para demostrar el efecto de carga progresiva
  reloadImage(): void {
    this.imageKey.update(key => key + 1);
  }
}