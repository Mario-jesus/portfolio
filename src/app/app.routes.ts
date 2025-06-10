import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./ui/pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'about',
    loadComponent: () => import('./ui/pages/about-me/about-me.component').then(m => m.AboutMeComponent)
  },
  {
    path: 'experience',
    loadComponent: () => import('./ui/pages/experience/experience.component').then(m => m.ExperienceComponent)
  },
  {
    path: 'projects',
    loadComponent: () => import('./ui/pages/projects/projects.component').then(m => m.ProjectsComponent)
  },
  {
    path: 'contact',
    loadComponent: () => import('./ui/pages/contact/contact.component').then(m => m.ContactComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
