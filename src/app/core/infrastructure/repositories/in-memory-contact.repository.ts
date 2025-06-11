import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { ContactMessage, ContactStatus, ContactInfo, SocialPlatform, ContactMethod } from '../../domain/entities/contact.entity';
import { ContactRepository } from '../../domain/ports/contact.repository';

@Injectable({
  providedIn: 'root'
})
export class InMemoryContactRepository extends ContactRepository {
  private messages: ContactMessage[] = [];
  
  private contactInfo: ContactInfo = {
    email: 'mariojesusariashernandez@gmail.com',
    phone: '+52 916 126 8346',
    location: 'Balancán, Tabasco, México',
    availability: 'Disponible para residencia profesional',
    preferredContactMethod: ContactMethod.PHONE,
    responseTime: '24-48 horas',
    socialLinks: [
      {
        platform: SocialPlatform.LINKEDIN,
        url: 'https://www.linkedin.com/in/mario-jes%C3%BAs-arias-hern%C3%A1ndez-b086b2319/',
        username: 'Mario Jesús'
      },
      {
        platform: SocialPlatform.GITHUB,
        url: 'https://github.com/Mario-jesus',
        username: 'Mario-jesus'
      },
      {
        platform: SocialPlatform.UNIVERSITY_EMAIL,
        url: 'mailto:mariojesusariashernandez@gmail.com',
        username: 'mariojesusariashernandez@gmail.com'
      }
    ]
  };

  getAllMessages(): Observable<ContactMessage[]> {
    return of([...this.messages]).pipe(delay(500));
  }

  getMessageById(id: string): Observable<ContactMessage | null> {
    const message = this.messages.find(m => m.id === id) || null;
    return of(message).pipe(delay(300));
  }

  getMessagesByStatus(status: ContactStatus): Observable<ContactMessage[]> {
    const filtered = this.messages.filter(m => m.status === status);
    return of([...filtered]).pipe(delay(400));
  }

  createMessage(messageData: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>): Observable<ContactMessage> {
    const newMessage: ContactMessage = {
      ...messageData,
      id: (this.messages.length + 1).toString(),
      createdAt: new Date(),
      status: ContactStatus.PENDING
    };
    
    this.messages.push(newMessage);
    return of(newMessage).pipe(delay(600));
  }

  updateMessageStatus(id: string, status: ContactStatus): Observable<ContactMessage> {
    const index = this.messages.findIndex(m => m.id === id);
    if (index === -1) {
      throw new Error(`Message with id ${id} not found`);
    }
    
    this.messages[index] = { ...this.messages[index], status };
    return of(this.messages[index]).pipe(delay(400));
  }

  deleteMessage(id: string): Observable<boolean> {
    const index = this.messages.findIndex(m => m.id === id);
    if (index === -1) {
      return of(false).pipe(delay(300));
    }
    
    this.messages.splice(index, 1);
    return of(true).pipe(delay(300));
  }

  getContactInfo(): Observable<ContactInfo> {
    return of({ ...this.contactInfo }).pipe(delay(300));
  }

  updateContactInfo(contactInfo: ContactInfo): Observable<ContactInfo> {
    this.contactInfo = { ...contactInfo };
    return of({ ...this.contactInfo }).pipe(delay(400));
  }
} 