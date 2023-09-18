import { Component, Input, OnInit } from '@angular/core';
import { DevPreInscription } from 'src/app/commun/interfaces/devPreInscription';
import { ManagerService } from '../../services/manager.service';

@Component({
  selector: 'app-inscriptions-demandes',
  templateUrl: './inscriptions-demandes.component.html',
  styleUrls: ['./inscriptions-demandes.component.scss']
})
export class InscriptionsDemandesComponent implements OnInit {
   allDemande: DevPreInscription[] = []

  ngOnInit(): void {
    this.getPreInscription()
  }
  constructor(private service: ManagerService
  ) {

  }

  getPreInscription() {

    this.service.getPreInscrit(this.service.idFormationForDetails).subscribe(
      {
        next: (res) => {
          this.allDemande = res;
        }
      }

    )
  }
}
