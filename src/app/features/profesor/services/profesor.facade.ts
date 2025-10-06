import { Injectable, signal } from '@angular/core';

export interface MateriaLite { id: number; nombre: string; }
export interface FinalResumen { id: number; materia: string; fecha: string; hora: string; inscriptos: number; }

@Injectable({ providedIn: 'root' })
export class ProfesorFacade {
  materias = signal<MateriaLite[]>([]);
  finalesConInscripciones = signal<FinalResumen[]>([]);
  inscripciones = signal<number>(0);

  loadDashboard() {
    // MOCK: reemplaza por tus llamadas a API
    this.materias.set([
      { id: 1, nombre: 'Programación I' },
      { id: 2, nombre: 'Programación II' },
    ]);
    // deja vacío para ver el estado “sin finales”
    // this.finalesConInscripciones.set([{ id:101, materia:'Programación I', fecha:'2024-02-15', hora:'09:00', inscriptos:2 }]);
    this.inscripciones.set(2);
  }
}
