import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ReturnedFormationForDev } from '../../interfaces/returnedFormationForDev';
import { FormationForDevService } from '../../services/formation-for-dev.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-preinscription',
  templateUrl: './preinscription.component.html',
  styleUrls: ['./preinscription.component.scss']
})
export class PreinscriptionComponent implements OnInit{
  formationPreInscris$:Observable<ReturnedFormationForDev[]>=new Observable()
  constructor(private service:FormationForDevService)
  {
  }
  ngOnInit(){
    this.getPreInscription()
  } 
  getPreInscription(){
    this.formationPreInscris$=this.service.getPreInscription();
  }

  delete(id: number) {
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
          this.service.deletePreInscription(id,sessionStorage.getItem("emailDev") as string).subscribe({
            next: (result) => {
              this.getPreInscription();
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
