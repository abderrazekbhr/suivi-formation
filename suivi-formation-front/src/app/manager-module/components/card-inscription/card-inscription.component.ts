import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormationForDevService } from 'src/app/dev-module/services/formation-for-dev.service';
import Swal from 'sweetalert2';
import { ManagerService } from '../../services/manager.service';

@Component({
  selector: 'app-card-inscription',
  templateUrl: './card-inscription.component.html',
  styleUrls: ['./card-inscription.component.scss']
})
export class CardInscriptionComponent implements OnInit {
  @Input() nom: string = "foulen"
  @Input() prenom: string = "foulen"
  @Input() email: string = "foulen@gmail.com"
  @Input() numero: string = ""
  @Output() reload: EventEmitter<boolean> = new EventEmitter();
  constructor(
    private serviceManager: ManagerService,
    private serviceDev: FormationForDevService
  ) {

  }

  ngOnInit(): void {
  }


  accept() {
    this.serviceManager.acceptPreInscription(
      this.serviceManager.idFormationForDetails, this.email
    ).subscribe(
      {
        next: (res) => {
          this.reload.emit(true)
        }
      }
    );
  }
  
  refuse() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });


    swalWithBootstrapButtons
      .fire({
        title: 'Vous etes sur?',
        text: "Voulez vous supprimer la pré-inscription!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Confirmé!',
        cancelButtonText: 'Annulé!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.serviceDev.deletePreInscription(this.serviceManager.idFormationForDetails, this.email).subscribe({
            next: (result) => {
              this.reload.emit(true)
            },
          });
          swalWithBootstrapButtons.fire(
            "La pré-inscription est supprimé avec succès.",
            'success'
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            'Annulé',
            "L'opération est annulée",
            'error'
          );
        }
      });
  }

}
