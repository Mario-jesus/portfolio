import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ThemeService } from '../../../shared/services/theme.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  private mobileMenuOpen = signal(false);

  navigationItems = [
    { label: 'Inicio', path: '/' },
    { label: 'Sobre Mí', path: '/about' },
    { label: 'Experiencia', path: '/experience' },
    { label: 'Proyectos', path: '/projects' },
    { label: 'Contacto', path: '/contact' }
  ];

  constructor(public themeService: ThemeService) {}

  isMobileMenuOpen(): boolean {
    return this.mobileMenuOpen();
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.set(!this.mobileMenuOpen());
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }
} 