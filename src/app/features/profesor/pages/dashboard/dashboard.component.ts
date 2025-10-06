import { Component, inject, computed, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProfesorFacade, FinalResumen, MateriaLite } from '../../services/profesor.facade';

@Component({
  standalone: true,
  selector: 'app-profesor-dashboard',
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  private facade = inject(ProfesorFacade);

  // 🔧 Tipamos explícitamente para evitar “unknown”
  materias: Signal<MateriaLite[]> = this.facade.materias;
  finales: Signal<FinalResumen[]> = this.facade.finalesConInscripciones;
  inscripciones: Signal<number> = this.facade.inscripciones;

  materiasCount = computed(() => this.materias().length);
  finalesCount  = computed(() => this.finales().length);
  inscCount     = computed(() => this.inscripciones());

  ngOnInit() {
    this.facade.loadDashboard();
  }
}
