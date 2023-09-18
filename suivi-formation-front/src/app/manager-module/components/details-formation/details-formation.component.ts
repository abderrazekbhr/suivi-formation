import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DevPreInscription } from 'src/app/commun/interfaces/devPreInscription';
import { ManagerService } from '../../services/manager.service';

@Component({
  selector: 'app-details-formation',
  templateUrl: './details-formation.component.html',
  styleUrls: ['./details-formation.component.scss']
})
export class DetailsFormationComponent implements OnInit {

  demande: boolean = true
  dataPreInsciption:DevPreInscription[]=[]
  preInscriptionState:boolean=false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: ManagerService
  ) {}

  ngOnInit() {
    this.service.idFormationForDetails=this.data.id as number
    this.preInscriptionState=this.data.detail as boolean
  }
  changeToDemande() {
    this.demande = true
  }
  changeFromDemande() {
    this.demande = false
  }


  getConfirmed() {

  }
  

}
