import { Observable } from 'rxjs';
import { Profile } from '../entities/profile.entity';

export abstract class ProfileRepository {
  abstract getProfile(): Observable<Profile>;
  abstract updateProfile(profile: Partial<Profile>): Observable<Profile>;
  abstract updateProfileImage(imageUrl: string): Observable<Profile>;
  abstract updateResume(resumeUrl: string): Observable<Profile>;
} 