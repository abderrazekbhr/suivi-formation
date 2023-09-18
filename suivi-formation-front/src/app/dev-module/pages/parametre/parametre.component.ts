import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Dev } from 'src/app/commun/interfaces/dev';
import { User } from 'src/app/commun/interfaces/user';
import { AuthentificationService } from 'src/app/commun/services/authentification.service';

@Component({
  selector: 'app-parametre',
  templateUrl: './parametre.component.html',
  styleUrls: ['./parametre.component.scss'],
})
export class ParametreComponent implements OnInit {
  dataDev: Dev = {
    email:sessionStorage.getItem("emailDev") as string,
    nom: '',
    prenom: '',
    password: '',
    numero: '',
    categories: [],
    profession:"Developpeur"
  };
  subscriptionParametre: Subscription = new Subscription();
  subscriptionUpdate: Subscription = new Subscription();
  constructor(private service: AuthentificationService,private router:Router) {}

  ngOnInit(): void {
    this.subscriptionParametre= this.service.getDevData().subscribe({
      next: (result) => {
        this.dataDev = result;
        if (this.dataDev.categories == undefined) {
          this.dataDev.categories = [];
        }
      },
    });
  }

  updateDev(data: any) {
    this.dataDev.email=sessionStorage.getItem("emailDev") as string
    this.subscriptionUpdate= this.service.updateDev(this.dataDev).subscribe(
      {
        next:(result)=>{
          this.router.navigate(["/dev","accueil"])
        }
      }

    )    
  }
  ngOnDestroy(): void {
    this.subscriptionParametre.unsubscribe();
    this.subscriptionUpdate.unsubscribe();
  }

}
