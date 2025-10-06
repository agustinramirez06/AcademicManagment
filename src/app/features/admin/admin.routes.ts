import { Routes } from '@angular/router';
import { adminGuard } from '../../guards/admin.guard';
import { AdminLayoutComponent } from './shell/admin-layout/admin-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const adminRoutes: Routes = [
  {
    path: 'admin',
    canActivate: [adminGuard],
    component: AdminLayoutComponent,
    children: [
      { path: '', component: DashboardComponent, title: 'Panel Admin' }
    ]
  }
];
