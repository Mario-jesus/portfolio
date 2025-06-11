import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ProfessionalResidency } from '../../../domain/entities/residency.entity';
import { ResidencyRepository } from '../../../domain/ports/residency.repository';

@Injectable({
  providedIn: 'root'
})
export class GetResidencyInfoUseCase {
  private residencyRepository = inject(ResidencyRepository);

  execute(): Observable<ProfessionalResidency> {
    return this.residencyRepository.getResidencyInfo();
  }
} 