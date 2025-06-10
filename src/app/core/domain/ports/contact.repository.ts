import { Observable } from 'rxjs';
import { ContactMessage, ContactStatus, ContactInfo } from '../entities/contact.entity';

export abstract class ContactRepository {
  abstract getAllMessages(): Observable<ContactMessage[]>;
  abstract getMessageById(id: string): Observable<ContactMessage | null>;
  abstract getMessagesByStatus(status: ContactStatus): Observable<ContactMessage[]>;
  abstract createMessage(message: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>): Observable<ContactMessage>;
  abstract updateMessageStatus(id: string, status: ContactStatus): Observable<ContactMessage>;
  abstract deleteMessage(id: string): Observable<boolean>;
  abstract getContactInfo(): Observable<ContactInfo>;
  abstract updateContactInfo(contactInfo: ContactInfo): Observable<ContactInfo>;
}

export abstract class EmailService {
  abstract sendContactMessage(message: ContactMessage): Observable<boolean>;
  abstract sendAutoReply(email: string, name: string): Observable<boolean>;
} 