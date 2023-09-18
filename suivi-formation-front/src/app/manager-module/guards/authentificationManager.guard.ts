import { CanActivateFn } from '@angular/router';

export const authentificationManagerGuard: CanActivateFn = (route, state) => {
  if (sessionStorage.getItem('emailManager')) {
    return true;
  }
  return false;
};
