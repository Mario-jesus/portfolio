import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ResidencyProposal, ResidencyDuration, ResidencyArea, ProposalStatus, CompensationType } from '../../../domain/entities/residency.entity';
import { ResidencyRepository } from '../../../domain/ports/residency.repository';

export interface CreateResidencyProposalRequest {
  companyName: string;
  projectTitle: string;
  description: string;
  duration: string;
  startDate: Date;
  endDate?: Date;
  area: string;
  requiredSkills: string[];
  mentorInfo?: {
    name: string;
    position: string;
    email: string;
    experience: string;
  };
  compensationOffered: boolean;
  additionalBenefits?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CreateResidencyProposalUseCase {
  private residencyRepository = inject(ResidencyRepository);

  execute(request: CreateResidencyProposalRequest): Observable<ResidencyProposal> {
    const proposalData = {
      companyName: request.companyName,
      projectTitle: request.projectTitle,
      description: request.description,
      duration: request.duration as ResidencyDuration,
      startDate: request.startDate,
      endDate: request.endDate,
      area: request.area as ResidencyArea,
      requiredSkills: request.requiredSkills,
      mentorInfo: request.mentorInfo,
      compensation: request.compensationOffered ? {
        type: CompensationType.STIPEND,
        amount: 0,
        currency: 'MXN',
        benefits: request.additionalBenefits ? [request.additionalBenefits] : []
      } : undefined,
      status: ProposalStatus.DRAFT
    };

    return this.residencyRepository.createResidencyProposal(proposalData);
  }
} 