import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { ContactMessage } from '../../domain/entities/contact.entity';
import { EmailService } from '../../domain/ports/contact.repository';

@Injectable({
  providedIn: 'root'
})
export class MockEmailService extends EmailService {
  
  sendContactMessage(message: ContactMessage): Observable<boolean> {
    // Simular envío de email de notificación
    console.log('📧 Enviando notificación de nuevo mensaje de contacto:', {
      from: message.email,
      name: message.name,
      subject: message.subject,
      message: message.message
    });
    
    // Simular delay de envío
    return of(true).pipe(delay(1000));
  }

  sendAutoReply(email: string, name: string): Observable<boolean> {
    // Simular envío de auto-respuesta
    console.log('🤖 Enviando auto-respuesta a:', {
      to: email,
      name: name,
      subject: 'Gracias por contactarme - Mario González',
      message: `Hola ${name},\n\nGracias por contactarme. He recibido tu mensaje y te responderé lo antes posible.\n\nSaludos,\nMario González`
    });
    
    // Simular delay de envío
    return of(true).pipe(delay(800));
  }
} 