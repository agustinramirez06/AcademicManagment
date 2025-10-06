import { Routes } from '@angular/router';
import { profesorGuard } from '../../guards/profesor.guard';

import { ProfesorLayoutComponent } from './shell/profesor-layout/profesor-layout.component';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FechasFinalesComponent } from './pages/fechas-finales/fechas-finales.component';
import { ListadoActasComponent } from './pages/listado-actas/listado-actas.component';
import { NoInscriptosComponent } from './pages/no-inscriptos/no-inscriptos.component';
import { InscriptosComponent } from './pages/inscriptos/inscriptos.component';
import { CorrelativasComponent } from './pages/correlativas/correlativas.component';
import { PlanCurricularComponent } from './pages/plan-curricular/plan-curricular.component';
import { CierreActaComponent } from './pages/cierre-acta/cierre-acta.component';

export const profesorRoutes: Routes = [
  {
    path: 'profesor',
    canActivate: [profesorGuard],
    component: ProfesorLayoutComponent,
    children: [
      { path: '', component: DashboardComponent, title: 'Panel Profesor' },
      { path: 'fechas-finales', component: FechasFinalesComponent },
      { path: 'listado-actas', component: ListadoActasComponent },
      { path: 'no-inscriptos', component: NoInscriptosComponent },
      { path: 'inscriptos', component: InscriptosComponent },
      { path: 'correlativas', component: CorrelativasComponent },
      { path: 'plan-curricular', component: PlanCurricularComponent },
      { path: 'cierre-acta', component: CierreActaComponent }
    ]
  }
];
