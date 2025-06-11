import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ResidencyProposal } from '../../../domain/entities/residency.entity';
import { ResidencyRepository } from '../../../domain/ports/residency.repository';

@Injectable({
  providedIn: 'root'
})
export class GetResidencyProposalsUseCase {
  private residencyRepository = inject(ResidencyRepository);

  execute(): Observable<ResidencyProposal[]> {
    return this.residencyRepository.getResidencyProposals();
  }
} 