import { Routes } from '@angular/router';
import { alumnoGuard } from '../../guards/alumno.guard';
import { AlumnoLayoutComponent } from './shell/alumno-layout/alumno-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const alumnoRoutes: Routes = [
  {
    path: 'alumno',
    canActivate: [alumnoGuard],
    component: AlumnoLayoutComponent,
    children: [
      { path: '', component: DashboardComponent, title: 'Panel Alumno' }
    ]
  }
];
