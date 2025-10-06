import { Routes } from '@angular/router';
import { profesorRoutes } from './features/profesor/profesor.routes';
import { alumnoRoutes } from './features/alumno/alumno.routes';
import { adminRoutes } from './features/admin/admin.routes';
import { directorRoutes } from './features/director/director.routes';
import { tecnicoRoutes } from './features/tecnico/tecnico.routes';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) },

  ...profesorRoutes,
  ...alumnoRoutes,
  ...adminRoutes,
  ...directorRoutes,
  ...tecnicoRoutes,

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];
