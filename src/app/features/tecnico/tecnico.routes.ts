import { Routes } from '@angular/router';
import { tecnicoGuard } from '../../guards/tecnico.guard';
import { TecnicoLayoutComponent } from './shell/tecnico-layout/tecnico-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const tecnicoRoutes: Routes = [
  {
    path: 'tecnico',
    canActivate: [tecnicoGuard],
    component: TecnicoLayoutComponent,
    children: [
      { path: '', component: DashboardComponent, title: 'Panel Técnico' }
    ]
  }
];
