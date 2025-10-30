import { Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';
import { RoleGuard } from './shared/guards/role.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      }
    ]
  },

  // Rutas del Administrador
  {
    path: 'admin',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['admin'] },
    loadChildren: () => import('./features/admin/admin.routes').then(m => m.routes)
  },

  // Rutas del Profesor
  {
    path: 'profesor',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['profesor'] },
    loadComponent: () => import('./features/profesor/shell/profesor-layout/profesor-layout.component')
      .then(m => m.ProfesorLayoutComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./features/profesor/pages/dashboard/dashboard.component')
          .then(m => m.DashboardComponent)
      },
      {
        path: 'fechas-finales',
        loadComponent: () => import('./features/profesor/pages/fechas-finales/fechas-finales.component')
          .then(m => m.FechasFinalesComponent)
      },
      {
        path: 'listado-actas',
        loadComponent: () => import('./features/profesor/pages/listado-actas/listado-actas.component')
          .then(m => m.ListadoActasComponent)
      },
      {
        path: 'no-inscriptos',
        loadComponent: () => import('./features/profesor/pages/no-inscriptos/no-inscriptos.component')
          .then(m => m.NoInscriptosComponent)
      },
      {
        path: 'inscriptos',
        loadComponent: () => import('./features/profesor/pages/inscriptos/inscriptos.component')
          .then(m => m.InscriptosComponent)
      },
      {
        path: 'correlativas',
        loadComponent: () => import('./features/profesor/pages/correlativas/correlativas.component')
          .then(m => m.CorrelativasComponent)
      },
      {
        path: 'plan-curricular',
        loadComponent: () => import('./features/profesor/pages/plan-curricular/plan-curricular.component')
          .then(m => m.PlanCurricularComponent)
      },
      {
        path: 'cierre-acta',
        loadComponent: () => import('./features/profesor/pages/cierre-acta/cierre-acta.component')
          .then(m => m.CierreActaComponent)
      },
      {
        path: 'notificaciones',
        loadComponent: () => import('./features/profesor/pages/notificaciones/notificaciones.component')
          .then(m => m.NotificacionesComponent)
      }
    ]
  },

  // TODO: Añadir rutas para alumno, director y tecnico según se vayan implementando
  
  // Redirecciones
  { path: '', pathMatch: 'full', redirectTo: 'auth/login' },
  { path: '**', redirectTo: 'auth/login' }
];
