import { Routes } from '@angular/router';
import { AuthGuard } from '../../shared/guards/auth.guard';
import { AdminLayoutComponent } from './shell/admin-layout/admin-layout.component';

export const routes: Routes = [
	{
		path: '',
		canActivate: [AuthGuard],
		component: AdminLayoutComponent,
		children: [
			{
				path: 'dashboard',
				loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
			},
			{
				path: 'inscriptos',
				loadComponent: () => import('./pages/inscriptos/inscriptos.component').then(m => m.InscriptosComponent)
			},
			{
				path: 'usuarios',
				loadComponent: () => import('./pages/usuarios/usuarios.component').then(m => m.UsuariosComponent)
			},
			{
				path: 'fechas',
				loadComponent: () => import('./pages/fechas/fechas.component').then(m => m.FechasComponent)
			},
			{
				path: 'reportes',
				loadComponent: () => import('./pages/reportes/reportes.component').then(m => m.ReportesComponent)
			},
			{
				path: 'notificaciones',
				loadComponent: () => import('./pages/notificaciones/notificaciones.component').then(m => m.NotificacionesComponent)
			},
			{ path: '', pathMatch: 'full', redirectTo: 'dashboard' }
		]
	}
];