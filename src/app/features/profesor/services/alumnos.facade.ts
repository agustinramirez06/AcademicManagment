import { Injectable, signal } from '@angular/core';

export interface NoIncriptoItem {
  carrera: string;
  alumno: string;
  dni: string;
  materia: string;
  email: string;
  telefono: string;
}

@Injectable({ providedIn: 'root' })
export class AlumnosFacade {
  noInscriptos = signal<NoIncriptoItem[]>([]);

  loadNoInscriptos() {
    // MOCK – Reemplazá por tu HttpClient
    this.noInscriptos.set([
      {
        carrera: 'Tecnicatura en Programación',
        alumno: 'Carlos Rodríguez',
        dni: '11111111',
        materia: 'Programación II',
        email: 'carlos.rodriguez@email.com',
        telefono: '011-2222-3333'
      },
      {
        carrera: 'Tecnicatura en Programación',
        alumno: 'Ana López',
        dni: '22222222',
        materia: 'Programación II',
        email: 'ana.lopez@email.com',
        telefono: '011-3333-4444'
      }
    ]);
  }
}
