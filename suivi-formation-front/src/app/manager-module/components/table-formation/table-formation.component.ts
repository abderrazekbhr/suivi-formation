import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Formation } from 'src/app/commun/interfaces/formation';
import { FormationService } from 'src/app/commun/services/formation.service';
import Swal from 'sweetalert2';
import { filter, map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { DetailsFormationComponent } from '../details-formation/details-formation.component';
import { AddFormationComponent } from '../add-formation/add-formation.component';
import { ManagerService } from '../../services/manager.service';
import { loginSignUpGuard } from 'src/app/commun/gards/login-sign-up.guard';
@Component({
  selector: 'app-table-formation',
  templateUrl: './table-formation.component.html',
  styleUrls: ['./table-formation.component.scss'],
})
export class TableFormationComponent implements OnInit {
  spinner = false;
  chipsValue: string = '';


  constructor(private _commun: FormationService, private mangerService: ManagerService, public dialog: MatDialog) { }
  @Input() data: Formation[] = [];
  formations$: Observable<Formation[]> = new Observable<Formation[]>();
  ngOnInit(): void {
    this.getAllFormation(true);

  }

  searchBy(filter: string, type: string) {
    this.chipsValue = '';

    if (filter == '') {
      this.getAllFormation(true);
    } else {
      this.formations$ = this._commun.getFormationsFiltred(
        sessionStorage.getItem('emailManager') as string,
        type,
        filter
      );
    }
  }
  
  getAllFormation(event: any) {
    this.formations$ = this._commun.getAllFormation(
      sessionStorage.getItem('emailManager') as string
    );
  }

  delete(id: number) {
    this.chipsValue = '';
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: 'Es-tu sûr ?',
        text: "Vous ne pourrez pas revenir en arrière !",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, supprimez-le !',
        cancelButtonText: 'Non, annuler !',
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            'Supprimé!',
            'La formation est déjà supprimée.',
            'success'
          );
          this._commun.deleteFormation(id).subscribe({
            next: (result) => {
              this.getAllFormation(true);
            },
          });
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'annulé',
            "l'opération de suppression est annulée",
            'error'
          );
        }
      });
  }

  update(id: number) {
    const dialog = this.dialog.open(AddFormationComponent, {
      data: {
        id: id,
        stateBtnConfirme: false,
      },
    });
    dialog.afterClosed().subscribe(
      {
        next: (result) => {
          this.getAllFormation(true)
        }
      }
    )
  }
  openFormationAdder() {
    const dialog = this.dialog.open(AddFormationComponent, {
      data: {
        stateBtnConfirme: false
      }
    });
    dialog.afterClosed().subscribe(
      {
        next: (result) => {
          this.getAllFormation(true)
        }
      }
    )
  }
  calculateDaysBetweenDates(startDateStr: Date) {
    const endDate = new Date();
    const startDate = new Date(startDateStr);
    const timeDiff = endDate.getTime() - startDate.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff;
  }

  progress(startDateStr: Date, duree: number) {
    if (startDateStr != undefined && duree <= this.calculateDaysBetweenDates(startDateStr)) {
      return 100;
    } else if (this.calculateDaysBetweenDates(startDateStr) < 0) {
      return 0;
    }

    return Math.round(
      (this.calculateDaysBetweenDates(startDateStr) / duree) * 100
    );
  }

  seeDetails(id: number,detail:boolean) {
    const details=this.dialog.open(DetailsFormationComponent, {
      data: {
        id: id,
        detail:!detail
      },
    });
    details.afterClosed().subscribe(
      {
        next: (result) => {
          this.getAllFormation(true)
        }
      }
    );
  }

  filterBy() {
    this.spinner = true;
    setTimeout(() => {
      this.spinner = false;
      if (this.chipsValue != undefined) {

        this.formations$ = this.formations$.pipe(
          map((formations: Formation[]) =>
            formations.filter((formation) => {
              return formation.categorie.includes(this.chipsValue);
            })
          )
        );
      }
      else {
        this.getAllFormation(true);

      }
    }, 1000);
  }
  confirm(id: number) {
    const dialog = this.dialog.open(AddFormationComponent, {
      data: {
        id: id,
        stateBtnConfirme: true
      },


    });
    dialog.afterClosed().subscribe(
      {
        next: (result) => {
          this.getAllFormation(true)
        }
      }
    )
  }
}
