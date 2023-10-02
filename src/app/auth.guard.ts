import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const oauthService: AuthService = inject(AuthService);
  const user = localStorage.getItem('auth-user');
  if (user) {
    return true;
  } else {
    oauthService.redirectLogin();
    return false;
  }
};
