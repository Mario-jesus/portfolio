import { Injectable, inject } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { ContactMessage, MessageType } from '../../../domain/entities/contact.entity';
import { ContactRepository, EmailService } from '../../../domain/ports/contact.repository';

export interface SendContactMessageRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
  messageType: MessageType;
  phoneNumber?: string;
  company?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SendContactMessageUseCase {
  private contactRepository = inject(ContactRepository);
  private emailService = inject(EmailService);

  execute(request: SendContactMessageRequest): Observable<ContactMessage> {
    // Validaciones
    this.validateRequest(request);

    // Crear el mensaje
    return this.contactRepository.createMessage(request).pipe(
      switchMap(message => {
        // Enviar email de notificación
        return this.emailService.sendContactMessage(message).pipe(
          switchMap(() => {
            // Enviar auto-respuesta
            return this.emailService.sendAutoReply(message.email, message.name).pipe(
              switchMap(() => [message])
            );
          })
        );
      })
    );
  }

  private validateRequest(request: SendContactMessageRequest): void {
    if (!request.name || request.name.trim() === '') {
      throw new Error('Name is required');
    }
    
    if (!request.email || request.email.trim() === '') {
      throw new Error('Email is required');
    }
    
    if (!this.isValidEmail(request.email)) {
      throw new Error('Invalid email format');
    }
    
    if (!request.subject || request.subject.trim() === '') {
      throw new Error('Subject is required');
    }
    
    if (!request.message || request.message.trim() === '') {
      throw new Error('Message is required');
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
} 