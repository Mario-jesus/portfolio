import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { 
  faSun, faMoon, faBars, faTimes,
  faHome, faUser, faFolderOpen, faBriefcase, faEnvelope
} from '@fortawesome/free-solid-svg-icons';
import { ThemeService } from '../../../shared/services/theme.service';
import { ScrollService } from '../../../shared/services/scroll.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule, FaIconComponent],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  private mobileMenuOpen = signal(false);
  private currentRoute = signal('');

  // FontAwesome icons
  faSun = faSun;
  faMoon = faMoon;
  faBars = faBars;
  faTimes = faTimes;
  faHome = faHome;
  faUser = faUser;
  faFolderOpen = faFolderOpen;
  faBriefcase = faBriefcase;
  faEnvelope = faEnvelope;

  navigationItems = [
    { label: 'Inicio', path: '/', icon: this.faHome },
    { label: 'Sobre Mí', path: '/about', icon: this.faUser },
    { label: 'Proyectos', path: '/projects', icon: this.faFolderOpen },
    { label: 'Experiencia', path: '/experience', icon: this.faBriefcase },
    { label: 'Contacto', path: '/contact', icon: this.faEnvelope }
  ];

  public themeService = inject(ThemeService);
  private scrollService = inject(ScrollService);
  private router = inject(Router);

  constructor() {
    // Detectar cambios de ruta
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.currentRoute.set(event.urlAfterRedirects);
    });

    // Establecer ruta inicial
    this.currentRoute.set(this.router.url);
  }

  isMobileMenuOpen(): boolean {
    return this.mobileMenuOpen();
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.set(!this.mobileMenuOpen());
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }

  onNavigate(): void {
    this.closeMobileMenu();
    // Pequeño delay para que la navegación se complete antes del scroll
    setTimeout(() => {
      this.scrollService.scrollToTop();
    }, 100);
  }

  isActiveRoute(path: string): boolean {
    return this.currentRoute() === path;
  }
} 