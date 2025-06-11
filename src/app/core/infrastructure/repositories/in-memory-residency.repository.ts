import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { 
  ProfessionalResidency, 
  ResidencyProposal, 
  ResidencyArea, 
  ResidencyStatus, 
  ResidencyDuration,
  AcademicLevel,
  TimeCommitment,
  LocationPreference,
  ProposalStatus,
  CompensationType
} from '../../domain/entities/residency.entity';
import { ResidencyRepository } from '../../domain/ports/residency.repository';

@Injectable({
  providedIn: 'root'
})
export class InMemoryResidencyRepository extends ResidencyRepository {
  private residencyInfo: ProfessionalResidency = {
    id: '1',
    title: 'Residencia Profesional en Desarrollo de Software',
    description: 'Busco una oportunidad de residencia profesional para aplicar mis conocimientos académicos en un entorno real de desarrollo de software, contribuyendo con proyectos innovadores mientras continúo mi formación profesional.',
    objectives: [
      'Aplicar conocimientos teóricos en proyectos reales',
      'Desarrollar habilidades profesionales en un entorno empresarial',
      'Contribuir con soluciones tecnológicas innovadoras',
      'Establecer conexiones profesionales en la industria',
      'Completar los requisitos académicos de residencia profesional'
    ],
    duration: ResidencyDuration.MEDIUM_TERM,
    preferredStartDate: new Date('2025-09-01'),
    preferredEndDate: new Date('2026-01-31'),
    areasOfInterest: [
      ResidencyArea.SOFTWARE_DEVELOPMENT,
      ResidencyArea.FRONTEND_DEVELOPMENT,
      ResidencyArea.BACKEND_DEVELOPMENT,
      ResidencyArea.MOBILE_DEVELOPMENT
    ],
    requiredSkills: [
      'Angular', 'TypeScript', 'JavaScript', 'HTML/CSS',
      'Python', 'Django', 'Git', 'Bases de datos'
    ],
    learningGoals: [
      'Metodologías ágiles de desarrollo',
      'Arquitectura de software empresarial',
      'Trabajo en equipo multidisciplinario',
      'Gestión de proyectos tecnológicos',
      'Buenas prácticas de desarrollo'
    ],
    deliverables: [
      'Proyecto de software funcional',
      'Documentación técnica completa',
      'Presentación de resultados',
      'Reporte de residencia profesional',
      'Código fuente documentado'
    ],
    benefits: {
      forStudent: [
        'Experiencia profesional real',
        'Aplicación de conocimientos académicos',
        'Desarrollo de habilidades blandas',
        'Networking profesional',
        'Posible oferta laboral futura'
      ],
      forCompany: [
        'Talento joven y motivado',
        'Perspectivas frescas e innovadoras',
        'Apoyo en proyectos específicos',
        'Posible reclutamiento futuro',
        'Contribución social y educativa'
      ]
    },
    requirements: {
      academicLevel: AcademicLevel.UNDERGRADUATE,
      minimumSemester: 8,
      requiredSkills: ['Programación', 'Bases de datos', 'Desarrollo web'],
      preferredSkills: ['Angular', 'Python', 'Git', 'Metodologías ágiles'],
      timeCommitment: TimeCommitment.PART_TIME,
      location: LocationPreference.REMOTE
    },
    status: ResidencyStatus.SEEKING
  };

  private proposals: ResidencyProposal[] = [
    {
      id: '1',
      companyName: 'TechCorp Solutions',
      projectTitle: 'Sistema de Gestión de Inventarios',
      description: 'Desarrollo de una aplicación web para gestión de inventarios con Angular y Django REST Framework.',
      duration: ResidencyDuration.MEDIUM_TERM,
      startDate: new Date('2024-08-15'),
      endDate: new Date('2025-01-15'),
      area: ResidencyArea.WEB_DEVELOPMENT,
      requiredSkills: ['Angular', 'TypeScript', 'Python', 'Django'],
      mentorInfo: {
        name: 'Ing. Carlos Mendoza',
        position: 'Senior Full Stack Developer',
        email: 'carlos.mendoza@techcorp.com',
        experience: '8 años en desarrollo web empresarial'
      },
      compensation: {
        type: CompensationType.STIPEND,
        amount: 8000,
        currency: 'MXN',
        benefits: ['Seguro médico', 'Capacitaciones', 'Certificaciones']
      },
      status: ProposalStatus.UNDER_REVIEW,
      createdAt: new Date('2024-03-01'),
      updatedAt: new Date('2024-03-15')
    },
    {
      id: '2',
      companyName: 'DataInsight Analytics',
      projectTitle: 'Dashboard de Análisis de Datos',
      description: 'Creación de dashboards interactivos para visualización de datos empresariales usando tecnologías modernas.',
      duration: ResidencyDuration.LONG_TERM,
      startDate: new Date('2024-09-01'),
      area: ResidencyArea.DATA_SCIENCE,
      requiredSkills: ['Python', 'JavaScript', 'D3.js', 'SQL'],
      mentorInfo: {
        name: 'Dra. Ana Rodríguez',
        position: 'Data Science Lead',
        email: 'ana.rodriguez@datainsight.com',
        experience: '10 años en ciencia de datos y analytics'
      },
      compensation: {
        type: CompensationType.HOURLY,
        amount: 150,
        currency: 'MXN',
        benefits: ['Horario flexible', 'Trabajo remoto', 'Capacitaciones']
      },
      status: ProposalStatus.PUBLISHED,
      createdAt: new Date('2024-02-20'),
      updatedAt: new Date('2024-03-10')
    }
  ];

  getResidencyInfo(): Observable<ProfessionalResidency> {
    return of({ ...this.residencyInfo }).pipe(delay(300));
  }

  updateResidencyInfo(residency: Partial<ProfessionalResidency>): Observable<ProfessionalResidency> {
    this.residencyInfo = { ...this.residencyInfo, ...residency };
    return of({ ...this.residencyInfo }).pipe(delay(500));
  }

  getResidencyProposals(): Observable<ResidencyProposal[]> {
    return of([...this.proposals]).pipe(delay(400));
  }

  getResidencyProposalById(id: string): Observable<ResidencyProposal> {
    const proposal = this.proposals.find(p => p.id === id);
    if (!proposal) {
      throw new Error(`Proposal with id ${id} not found`);
    }
    return of({ ...proposal }).pipe(delay(300));
  }

  createResidencyProposal(proposal: Omit<ResidencyProposal, 'id' | 'createdAt' | 'updatedAt'>): Observable<ResidencyProposal> {
    const newProposal: ResidencyProposal = {
      ...proposal,
      id: (this.proposals.length + 1).toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.proposals.push(newProposal);
    return of({ ...newProposal }).pipe(delay(600));
  }

  updateResidencyProposal(id: string, proposal: Partial<ResidencyProposal>): Observable<ResidencyProposal> {
    const index = this.proposals.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error(`Proposal with id ${id} not found`);
    }
    this.proposals[index] = { 
      ...this.proposals[index], 
      ...proposal, 
      updatedAt: new Date() 
    };
    return of({ ...this.proposals[index] }).pipe(delay(500));
  }

  deleteResidencyProposal(id: string): Observable<boolean> {
    const index = this.proposals.findIndex(p => p.id === id);
    if (index === -1) {
      return of(false).pipe(delay(300));
    }
    this.proposals.splice(index, 1);
    return of(true).pipe(delay(400));
  }

  getProposalsByArea(area: ResidencyArea): Observable<ResidencyProposal[]> {
    const filtered = this.proposals.filter(p => p.area === area);
    return of([...filtered]).pipe(delay(350));
  }

  getProposalsByStatus(status: ProposalStatus): Observable<ResidencyProposal[]> {
    const filtered = this.proposals.filter(p => p.status === status);
    return of([...filtered]).pipe(delay(350));
  }

  searchProposals(query: string): Observable<ResidencyProposal[]> {
    const lowerQuery = query.toLowerCase();
    const filtered = this.proposals.filter(p => 
      p.companyName.toLowerCase().includes(lowerQuery) ||
      p.projectTitle.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.requiredSkills.some(skill => skill.toLowerCase().includes(lowerQuery))
    );
    return of([...filtered]).pipe(delay(400));
  }
} 