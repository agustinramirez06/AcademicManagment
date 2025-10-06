import { Injectable, signal } from '@angular/core';

export type EstadoAlumno = 'inscripto' | 'ausente' | 'aprobado' | 'desaprobado';

export interface AlumnoDeMesa {
  id: number;
  nombre: string;
  estado: EstadoAlumno;
  nota?: number | null;
}

export interface MesaFinal {
  id: number;
  materia: string;
  fecha: string;   // YYYY-MM-DD
  alumnos: AlumnoDeMesa[];
}

@Injectable({ providedIn: 'root' })
export class CierreActaFacade {
  // listado de mesas visibles para el profesor
  mesas = signal<MesaFinal[]>([]);

  load() {
    // MOCK – Reemplazar por HttpClient a tu backend
    this.mesas.set([
      {
        id: 1,
        materia: 'Programación I',
        fecha: '2024-02-15',
        alumnos: [
          { id: 101, nombre: 'Carlos Rodríguez', estado: 'inscripto', nota: null },
          { id: 102, nombre: 'Ana López',        estado: 'inscripto', nota: null },
        ]
      },
      {
        id: 2,
        materia: 'Programación II',
        fecha: '2024-03-01',
        alumnos: []
      }
    ]);
  }

  /**
   * Guarda la nota del alumno en una mesa (mock local).
   * En producción: POST/PUT a /mesas/:mesaId/alumnos/:alumnoId/nota
   */
  async guardarNota(mesaId: number, alumnoId: number, nota: number): Promise<void> {
    // Simulación de latencia
    await new Promise(r => setTimeout(r, 300));

    this.mesas.update(list => {
      const copia = structuredClone(list) as MesaFinal[];
      const mesa = copia.find(m => m.id === mesaId);
      if (!mesa) return list;
      const alu = mesa.alumnos.find(a => a.id === alumnoId);
      if (!alu) return list;

      alu.nota = nota;
      alu.estado = nota >= 4 ? 'aprobado' : 'desaprobado';
      return copia;
    });
  }
}
