import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Profile } from '../../../domain/entities/profile.entity';
import { ProfileRepository } from '../../../domain/ports/profile.repository';

@Injectable({
  providedIn: 'root'
})
export class GetProfileUseCase {
  private profileRepository = inject(ProfileRepository);

  execute(): Observable<Profile> {
    return this.profileRepository.getProfile();
  }
} 