import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const userGuard: CanActivateFn = (route, state) => {
  const oauthService: AuthService = inject(AuthService);
  const user = localStorage.getItem('auth-user');
  const router = inject(Router);
  if (user) {
    const role = localStorage.getItem('auth-role');
    if (role == '2') {
      return true;
    } else {
      router.navigate(['/']);
      return false;
    }
  } else {
    oauthService.redirectLogin();
    return false;
  }
};
