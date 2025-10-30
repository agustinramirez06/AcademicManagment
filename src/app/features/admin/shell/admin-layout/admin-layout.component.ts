import { Component, HostListener, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../shared/services/auth.service';


@Component({
	selector: 'app-admin-layout',
	standalone: true,
	imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
	templateUrl: './admin-layout.component.html',
	styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent {
	menuOpen = signal(false);
	isMobile = signal(false);
	user$ = this.auth.user$;

	constructor(private auth: AuthService) {
		this.updateIsMobile();
	}

	@HostListener('window:resize') onResize() {
		this.updateIsMobile();
	}

	private updateIsMobile() {
		this.isMobile.set(window.innerWidth < 992); // < 992px = sólo móvil/tablet
		if (!this.isMobile()) this.menuOpen.set(false);
	}

	toggleMenu() { this.menuOpen.update(v => !v); }
	closeMenu() { this.menuOpen.set(false); }
	logout() { this.auth.logout(); }
}