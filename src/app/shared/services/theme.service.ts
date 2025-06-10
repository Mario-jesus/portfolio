import { Injectable, signal, effect } from '@angular/core';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly THEME_KEY = 'portfolio-theme';
  
  // Signal para el tema actual
  public theme = signal<Theme>(this.getInitialTheme());

  constructor() {
    // Effect para aplicar el tema cuando cambie
    effect(() => {
      this.applyTheme(this.theme());
    });
  }

  /**
   * Alterna entre modo claro y oscuro
   */
  toggleTheme(): void {
    const newTheme: Theme = this.theme() === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  /**
   * Establece un tema específico
   */
  setTheme(theme: Theme): void {
    this.theme.set(theme);
    
    // Guardar en localStorage de forma segura
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(this.THEME_KEY, theme);
      }
    } catch (error) {
      console.warn('Error saving theme to localStorage:', error);
    }
  }

  /**
   * Obtiene el tema inicial basado en preferencias del usuario
   */
  private getInitialTheme(): Theme {
    // Verificar si estamos en el navegador
    if (typeof window === 'undefined') {
      return 'light';
    }

    // 1. Verificar localStorage
    try {
      const savedTheme = localStorage.getItem(this.THEME_KEY) as Theme;
      if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
        return savedTheme;
      }
    } catch (error) {
      console.warn('Error accessing localStorage:', error);
    }

    // 2. Verificar preferencia del sistema
    try {
      if (window.matchMedia) {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        return prefersDark ? 'dark' : 'light';
      }
    } catch (error) {
      console.warn('Error accessing matchMedia:', error);
    }

    // 3. Default a modo claro
    return 'light';
  }

  /**
   * Aplica el tema al documento
   */
  private applyTheme(theme: Theme): void {
    if (typeof document !== 'undefined' && document.documentElement) {
      const root = document.documentElement;
      
      // Remover ambas clases primero para evitar conflictos
      root.classList.remove('light', 'dark');
      
      // Agregar la clase correspondiente
      root.classList.add(theme);
      
      // También establecer el atributo data-theme para compatibilidad adicional
      root.setAttribute('data-theme', theme);
    }
  }

  /**
   * Verifica si el tema actual es oscuro
   */
  isDark(): boolean {
    return this.theme() === 'dark';
  }

  /**
   * Verifica si el tema actual es claro
   */
  isLight(): boolean {
    return this.theme() === 'light';
  }
} 