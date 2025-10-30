import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  standalone: true,
  selector: 'app-inscriptos',
  imports: [CommonModule],
  templateUrl: './inscriptos.component.html',
  styleUrls: ['./inscriptos.component.scss']
})
export class InscriptosComponent {
  rows = Array.from({ length: 20 }).map((_, i) => ({
    alumno: `Alumno ${i + 1}`,
    materia: 'Programación I',
    fecha: '2024-12-01',
    estado: i % 2 ? 'Confirmado' : 'Pendiente'
  }));
}
