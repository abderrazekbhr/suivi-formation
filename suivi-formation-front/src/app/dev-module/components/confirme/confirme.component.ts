import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { ReturnedFormationForDev } from '../../interfaces/returnedFormationForDev';
import { FormationForDevService } from '../../services/formation-for-dev.service';

@Component({
  selector: 'app-confirme',
  templateUrl: './confirme.component.html',
  styleUrls: ['./confirme.component.scss']
})
export class ConfirmeComponent implements OnInit {
  confirmed$:Observable<ReturnedFormationForDev[]>=new Observable()
  constructor(private service:FormationForDevService){
  
  }

  ngOnInit(){
    this.getConfirmed()
  }
  getConfirmed(){
    this.confirmed$=this.service.returnedonfirmedFormation();
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
              this.getConfirmed();
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
