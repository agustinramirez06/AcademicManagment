import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const alumnoGuard: CanActivateFn = () => {
  const router = inject(Router);
  const user = (localStorage.getItem('user') || '').toLowerCase();

  if (user.startsWith('alumno')) return true;

  router.navigate(['/login']);
  return false;
};
