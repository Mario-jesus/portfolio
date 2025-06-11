import { Observable } from 'rxjs';
import { ProfessionalResidency, ResidencyProposal, ResidencyArea, ProposalStatus } from '../entities/residency.entity';

export abstract class ResidencyRepository {
  abstract getResidencyInfo(): Observable<ProfessionalResidency>;
  abstract updateResidencyInfo(residency: Partial<ProfessionalResidency>): Observable<ProfessionalResidency>;
  abstract getResidencyProposals(): Observable<ResidencyProposal[]>;
  abstract getResidencyProposalById(id: string): Observable<ResidencyProposal>;
  abstract createResidencyProposal(proposal: Omit<ResidencyProposal, 'id' | 'createdAt' | 'updatedAt'>): Observable<ResidencyProposal>;
  abstract updateResidencyProposal(id: string, proposal: Partial<ResidencyProposal>): Observable<ResidencyProposal>;
  abstract deleteResidencyProposal(id: string): Observable<boolean>;
  abstract getProposalsByArea(area: ResidencyArea): Observable<ResidencyProposal[]>;
  abstract getProposalsByStatus(status: ProposalStatus): Observable<ResidencyProposal[]>;
  abstract searchProposals(query: string): Observable<ResidencyProposal[]>;
} 