import { CanActivateFn } from '@angular/router';

export const loginSignUpGuard: CanActivateFn = (route, state) => {
  if(sessionStorage.getItem("emailManager")!=null && sessionStorage.getItem("emailDec")!=null  ){
    return false
  }
  return true;
};
