import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
	standalone: true,
	selector: 'app-notificaciones',
	imports: [CommonModule],
	template: `<h2 style="color:#fff">Envío de Notificaciones</h2>`
})
export class NotificacionesComponent {}