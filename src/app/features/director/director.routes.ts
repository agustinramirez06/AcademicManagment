import { Routes } from '@angular/router';
import { directorGuard } from '../../guards/director.guard';
import { DirectorLayoutComponent } from './shell/director-layout/director-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const directorRoutes: Routes = [
  {
    path: 'director',
    canActivate: [directorGuard],
    component: DirectorLayoutComponent,
    children: [
      { path: '', component: DashboardComponent, title: 'Panel Director' }
    ]
  }
];
