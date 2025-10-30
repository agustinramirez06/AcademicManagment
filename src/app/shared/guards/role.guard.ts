import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService, User } from '../services/auth.service';

type Role = User['role'];

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: any): boolean | UrlTree {
    const expected: Role[] = route.data?.roles || [];
    const currentUser = this.auth.currentUser();

    console.log('RoleGuard - Expected roles:', expected);
    console.log('RoleGuard - Current user:', currentUser);

    if (!currentUser?.role) {
      console.log('RoleGuard - No user logged in or user has no role');
      return this.router.createUrlTree(['/auth/login']);
    }

    if (!expected.includes(currentUser.role)) {
      console.log('RoleGuard - User role not authorized');
      return this.router.createUrlTree(['/auth/login']);
    }

    console.log('RoleGuard - Access granted');
    return true;
  }
}
