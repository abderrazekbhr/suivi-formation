import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-path-invalid',
  templateUrl: './path-invalid.component.html',
  styleUrls: ['./path-invalid.component.scss']
})
export class PathInvalidComponent {
  constructor(private router:Router){
    if(sessionStorage.getItem("emailManager")!=null){
    this.router.navigate(["/manager","accueil"])

    }
    else if(sessionStorage.getItem("emailDev")!=null){
    this.router.navigate(["/dev","accueil"])
    }
    else{

      this.router.navigate(["/connexion"])
    }
  }
}
