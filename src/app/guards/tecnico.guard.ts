import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const tecnicoGuard: CanActivateFn = () => {
  const router = inject(Router);
  const user = (localStorage.getItem('user') || '').toLowerCase();

  if (user.startsWith('tecnico')) return true;

  router.navigate(['/login']);
  return false;
};
