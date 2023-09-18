import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { EntiteFormatrice } from '../../interfaces/entiteFomatrice';
import { ManagerService } from '../../services/manager.service';
import { Formation } from 'src/app/commun/interfaces/formation';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormationService } from 'src/app/commun/services/formation.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-formation',
  templateUrl: './add-formation.component.html',
  styleUrls: ['./add-formation.component.scss'],
})
export class AddFormationComponent implements OnInit {
  spinner = false
  f: Formation = {
    idFormation: 0,
    categorie: "",
    nomFormation: "",
    nombrePlace: 1,
    description: "",
    dateDebut: undefined,
    duree: 1,
    entiteFormatrice: "",
    time: "",
    confirmed: false,
    numberInscrit: 0
  };
  stateBtnConfirme: boolean = false;
  today = new Date()
  update = false
  emailManager: string = sessionStorage.getItem('emailManager') as string;
  msgFormation: string = '';
  toastFormationState: boolean = false;
  entiteFormatice: EntiteFormatrice[] = [];
  addFormationSubscription: Subscription = new Subscription();
  getAllEntiteSubscription: Subscription = new Subscription();
  confirmFormationSubscription: Subscription = new Subscription();
  getFormationByIdSubscription: Subscription = new Subscription();
  photo: File | null = null
  @Output() refreche = new EventEmitter<boolean>();
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { id: number, stateBtnConfirme?: boolean },
    private service: ManagerService,
    private _snackBar: MatSnackBar,
    private _commun: FormationService

  ) { }

  ngOnInit(): void {
    if (this.data.stateBtnConfirme != undefined && this.data.stateBtnConfirme != null) {
      this.stateBtnConfirme = this.data.stateBtnConfirme as boolean
    }
    this.getAllEntiteSubscription = this.service.getAllEntite().subscribe({
      next: (result) => {
        this.entiteFormatice = result;
      },
    });
    if (this.data != null && this.data.id != undefined) {
      this.getFormationByIdSubscription=this._commun.getFormationById(this.data.id).subscribe({
        next: (result) => {
          this.f = result
          this.f.entiteFormatrice = ""
        }
      })
    }


  }

  addFormation(elt: any, msg = "Formation ajoutée avec succés") {
    const formData = new FormData();
    let data: Formation = elt.value;
    data.idFormation = this.f.idFormation
    console.log(this.f.idFormation);
    data.emailManager = sessionStorage.getItem('emailManager') as string;
    formData.append("nomFormation", data.nomFormation)
    formData.append("categorie", data.categorie)
    formData.append("nombrePlace", data.nombrePlace.toString())
    formData.append("description", data.description)
    formData.append("dateDebut", data.dateDebut?.toString() as string)
    formData.append("duree", data.duree.toString())
    formData.append("entiteFormatrice", data.entiteFormatrice)
    formData.append("emailManager", data.emailManager)
    formData.append("time", data.time)
    formData.append("idFormation", this.f.idFormation?.toString() as string);
    if (this.photo != null) {
      formData.append("photo", this.photo)
    }
    this.spinner = true
    this.service.addFormation(formData).subscribe({
      next: (result) => {
        this.toastFormationState = true;
        this.msgFormation = msg;


      },
      error: (err) => {
      }
      , complete: () => {
        elt.reset();
        this.photo = null
        this.refreche.emit(true);
        this._snackBar.open(this.msgFormation, "fermé", {
          duration: 1000
        })
        this.spinner = false
      }
    });
  }

  onFileSelected(event: any) {
    this.photo = event.target.files[0];
  }

  confirmFormation(elt: any) {
    this.addFormation(elt, "Formation confirmée avec succés")
    this.confirmFormationSubscription=this.service.confirmFormation(this.f.idFormation as number).subscribe({
      next: (result) => {
      },
      error: (err) => {
        console.log(err);
      }
      , complete: () => {
        elt.reset()
      }
    })
  }

  ngOnDestroy(): void {
    this.addFormationSubscription.unsubscribe();
    this.getAllEntiteSubscription.unsubscribe();
    this.confirmFormationSubscription.unsubscribe();
    this.getFormationByIdSubscription.unsubscribe();
  }
}
