import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../../services/authentification.service';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-resgitre',
  templateUrl: './resgitre.component.html',
  styleUrls: ['./resgitre.component.scss'],
})
export class ResgitreComponent {
  affiche: boolean = false;
  toastStatus: boolean = false;
  msg: string = 'Votre compte a été crée avec succès';
  constructor(
    private _route: Router,
    private _service: AuthentificationService,
    private _snackBar: MatSnackBar

  ) {}
  connect() {
    this._route.navigate(['connexion']);
  }

  registre() {
    this._route.navigate(['registre']);
  }

  onRegistre(data: NgForm) {
    console.log(data.value);
    
    this._service.registre(data.value,data.value.categorie).subscribe({
      next: (result) => {
        if (result) {
          data.reset();
          this.msg = 'Votre compte a été crée avec succès';
          this._snackBar.open(this.msg, 'fermé', {
            panelClass: ['primary-snackbar'],
            duration: 2000,
          },);
        } else {
          this.msg = "Votre compte n'a pas été crée";
          this._snackBar.open(this.msg, 'fermé', {
            panelClass: ['accent-snackbar'],
            duration: 2000,
          },);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
