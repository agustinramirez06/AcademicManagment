import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'profesor',
    // Carga perezosa del layout standalone
    loadComponent: () =>
      import('./features/profesor/shell/profesor-layout/profesor-layout.component')
        .then(m => m.ProfesorLayoutComponent),
    children: [
      {
        path: '',
        // Dashboard del profesor
        loadComponent: () =>
          import('./features/profesor/pages/dashboard/dashboard.component')
            .then(m => m.DashboardComponent),
      },
      {
        path: 'fechas-finales',
        loadComponent: () =>
          import('./features/profesor/pages/fechas-finales/fechas-finales.component')
            .then(m => m.FechasFinalesComponent),
      },
      {
        path: 'listado-actas',
        loadComponent: () =>
          import('./features/profesor/pages/listado-actas/listado-actas.component')
            .then(m => m.ListadoActasComponent),
      },
      {
        path: 'no-inscriptos',
        loadComponent: () =>
          import('./features/profesor/pages/no-inscriptos/no-inscriptos.component')
            .then(m => m.NoInscriptosComponent),
      },
      {
        path: 'inscriptos',
        loadComponent: () =>
          import('./features/profesor/pages/inscriptos/inscriptos.component')
            .then(m => m.InscriptosComponent),
      },
      {
        path: 'correlativas',
        loadComponent: () =>
          import('./features/profesor/pages/correlativas/correlativas.component')
            .then(m => m.CorrelativasComponent),
      },
      {
        path: 'plan-curricular',
        loadComponent: () =>
          import('./features/profesor/pages/plan-curricular/plan-curricular.component')
            .then(m => m.PlanCurricularComponent),
      },
      {
        path: 'cierre-acta',
        loadComponent: () =>
          import('./features/profesor/pages/cierre-acta/cierre-acta.component')
            .then(m => m.CierreActaComponent),
      },
      {
        path: 'notificaciones',
        loadComponent: () =>
          import('./features/profesor/pages/notificaciones/notificaciones.component')
            .then(m => m.NotificacionesComponent),
      }
    ],
  },

  // Rutas de autenticación (ajusta si ya las tenés)
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.component').then(m => m.LoginComponent),
  },

  // Redirecciones
  { path: '', pathMatch: 'full', redirectTo: 'profesor' },
  { path: '**', redirectTo: 'profesor' },
];
