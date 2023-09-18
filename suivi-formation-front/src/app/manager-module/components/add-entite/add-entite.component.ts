import { Component, Inject, Input, OnInit } from '@angular/core';
import { ManagerService } from '../../services/manager.service';
import { Formation } from 'src/app/commun/interfaces/formation';
import { Observable } from 'rxjs';
import { EntiteFormatrice } from '../../interfaces/entiteFomatrice';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-entite',
  templateUrl: './add-entite.component.html',
  styleUrls: ['./add-entite.component.scss']
})
export class AddEntiteComponent implements OnInit  {
  msgEntite: string = '';
  eF: EntiteFormatrice = {
    idEntite: 0,
    nomEntite: '',
    description:  '',
    formationNumber:0,
  }
  toastEntiteState: boolean = false;
  emailManager: string = sessionStorage.getItem('emailManager') as string;
  
  ngOnInit(): void {
    if(this.data.id!=undefined){
      this.service.getEntiteById(this.data.id).subscribe({
        next: (result) => {
          console.log(result);
          
          this.eF=result
        }})
    }
  }

  constructor(    @Inject(MAT_DIALOG_DATA) public data:{"id":number},
  private service: ManagerService,
  private _snackBar: MatSnackBar,
  ) {}
 
 

  addEntite(elt: any) {
    if(this.data!=null && this.data.id!=undefined){
      
      this.service.updateEntite(this.eF).subscribe({
        next: (result) => {
          this.msgEntite = 'Entité modifiée avec succés';
          elt.reset();
          this._snackBar.open(this.msgEntite, 'close', {
            duration: 2000,
            panelClass: ['blue-snackbar'],
          });
          
        },
      });
    }
    else{
      this.service.addEntite(elt.value).subscribe({
      next: (result) => {
        this.msgEntite = 'Entité ajoutée avec succés';
        elt.reset();
        this._snackBar.open(this.msgEntite, 'close', {
          duration: 2000,
          panelClass: ['blue-snackbar'],
        });
        
      },
    });}
  }


}
