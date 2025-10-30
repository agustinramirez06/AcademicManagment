import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
	standalone: true,
	selector: 'app-usuarios',
	imports: [CommonModule],
	template: `<h2 style="color:#fff">Gestión de Usuarios</h2>`
})
export class UsuariosComponent {}