import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const directorGuard: CanActivateFn = () => {
  const router = inject(Router);
  const user = (localStorage.getItem('user') || '').toLowerCase();

  if (user.startsWith('director')) return true;

  router.navigate(['/login']);
  return false;
};
