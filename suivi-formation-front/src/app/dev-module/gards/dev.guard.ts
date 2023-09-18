import { CanActivateFn } from '@angular/router';

export const devGuard: CanActivateFn = (route, state) => {
  
  if(sessionStorage.getItem("emailDev")!=null){
    return true
  }
  return false;

};
