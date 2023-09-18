import { Component } from '@angular/core';
import { Input, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Formation } from 'src/app/commun/interfaces/formation';
import { FormationService } from 'src/app/commun/services/formation.service';
import Swal from 'sweetalert2';
import { EntiteFormatrice } from '../../interfaces/entiteFomatrice';
import { ManagerService } from '../../services/manager.service';
import { MatDialog } from '@angular/material/dialog';
import { AddEntiteComponent } from '../add-entite/add-entite.component';

@Component({
  selector: 'app-table-entite',
  templateUrl: './table-entite.component.html',
  styleUrls: ['./table-entite.component.scss'],
})
export class TableEntiteComponent {
  constructor(

    private _commun: FormationService,
    private _service: ManagerService,
    public dialog: MatDialog
  ) { }
  entites$: Observable<EntiteFormatrice[]> = new Observable<
    EntiteFormatrice[]
  >();
  ngOnInit(): void {
    this.getEntites();
  }

  getEntites() {
    this.entites$ = this._service.getAllEntite();
  }

  searchBy(type: string, filter: string) {
    if (filter == '') {
      this.getEntites();
    } else {
      this.getEntites()
      this.entites$ = this.entites$.pipe(
        map(
          entites => {
            return entites.filter(
              e => {
                if (type == 'Nom') {
                  return e.nomEntite.toLowerCase().indexOf(filter.toLowerCase()) >= 0
                }
                return e.description.toLowerCase().indexOf(filter.toLowerCase()) >= 0
              }
            )
          }
        )
      )
    }
  }



  update(id: number) {
    this.dialog.open(AddEntiteComponent, {
      data: { id: id },
    });
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
        text: "Voulez vous supprimer l'entité formatrice!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Confirmé!',
        cancelButtonText: 'Annulé!',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this._service.deleteEntite(id).subscribe({
            next: (result) => {
              this.getEntites();
            },
          });
          swalWithBootstrapButtons.fire(
            "L'entite est supprimé avec succès.",
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

  oppenEntiteAdder() {
    const dialog = this.dialog.open(AddEntiteComponent);
    dialog.afterClosed().subscribe(
      {
        next: (res) => {
          this.getEntites()
        }
      }
    )
  }
}
