import { Component, input, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-progressive-image',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './progressive-image.html',
  styleUrls: ['./progressive-image.scss']
})
export class ProgressiveImageComponent implements OnInit, OnDestroy {
  src = input<string>('');
  alt = input<string>('');
  class = input<string>('');
  placeholderSrc = input<string>('');
  blurAmount = input<number>(10);
  transitionDuration = input<number>(800);

  isLoaded = signal(false);
  isError = signal(false);
  currentSrc = signal('');
  showSpinner = signal(false);

  private imageElement: HTMLImageElement | null = null;
  private spinnerTimeout: ReturnType<typeof setTimeout> | null = null;

  ngOnInit(): void {
    this.loadImage();
  }

  ngOnDestroy(): void {
    if (this.imageElement) {
      this.imageElement.onload = null;
      this.imageElement.onerror = null;
      this.imageElement = null;
    }
    if (this.spinnerTimeout) {
      clearTimeout(this.spinnerTimeout);
      this.spinnerTimeout = null;
    }
  }

  private loadImage(): void {
    if (!this.src()) {
      this.isError.set(true);
      return;
    }

    // Mostrar placeholder o imagen borrosa inicialmente
    this.currentSrc.set(this.placeholderSrc() || this.src());
    this.isLoaded.set(false);
    this.isError.set(false);
    this.showSpinner.set(false);

    // Mostrar spinner solo si la carga tarda más de 1 segundo
    this.spinnerTimeout = setTimeout(() => {
      if (!this.isLoaded() && !this.isError()) {
        this.showSpinner.set(true);
      }
    }, 1000);

    // Crear elemento de imagen para precargar
    this.imageElement = new Image();
    
    this.imageElement.onload = () => {
      // Limpiar timeout del spinner
      if (this.spinnerTimeout) {
        clearTimeout(this.spinnerTimeout);
        this.spinnerTimeout = null;
      }
      
      // Delay mínimo para transición suave pero rápida
      setTimeout(() => {
        this.currentSrc.set(this.src());
        this.isLoaded.set(true);
        this.showSpinner.set(false);
      }, 100);
    };

    this.imageElement.onerror = () => {
      // Limpiar timeout del spinner
      if (this.spinnerTimeout) {
        clearTimeout(this.spinnerTimeout);
        this.spinnerTimeout = null;
      }
      
      this.isError.set(true);
      this.showSpinner.set(false);
      // Fallback a imagen por defecto
      this.currentSrc.set('/assets/profile/default-avatar.svg');
    };

    // Iniciar la carga
    this.imageElement.src = this.src();
  }

  onImageError(): void {
    this.isError.set(true);
    this.currentSrc.set('/assets/profile/default-avatar.svg');
  }

  getImageClasses(): string {
    const baseClasses = this.class();
    const loadingClasses = this.isLoaded() ? 'loaded' : 'loading';
    const errorClasses = this.isError() ? 'error' : '';
    
    return `progressive-image ${baseClasses} ${loadingClasses} ${errorClasses}`.trim();
  }

  getImageStyles(): Record<string, string> {
    return {
      'filter': this.isLoaded() ? 'blur(0px)' : `blur(${this.blurAmount()}px)`,
      'transition': `filter ${this.transitionDuration()}ms ease-out, transform ${this.transitionDuration()}ms ease-out, opacity ${this.transitionDuration()}ms ease-out`,
      'transform': this.isLoaded() ? 'scale(1)' : 'scale(1.02)',
      'opacity': this.isLoaded() ? '1' : '0.8'
    };
  }
}
