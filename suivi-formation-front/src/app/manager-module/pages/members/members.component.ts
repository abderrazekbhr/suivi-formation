import { Component, OnInit } from '@angular/core';
import { ManagerService } from '../../services/manager.service';
import { FiltredDev } from '../../interfaces/filtredDev';
import Swal from 'sweetalert2'
import { Observable } from 'rxjs';
@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {
  spinner: boolean = false;

  dataDev: FiltredDev[] = [];
  searchbar: string = "";
  checkedMail: string[] = [];
  emailManager: string = sessionStorage.getItem("emailManager") as string;
  members$: Observable<string[]> = new Observable<string[]>();
  constructor(private service: ManagerService) { }
  ngOnInit(): void {
    this.members$ = this.service.getMembers(this.emailManager)
  }

  searchByEmail(filterText: string) {
    this.checkedMail = []
    this.service.getMemberByEmail(filterText).subscribe(
      (data: FiltredDev[]) => {
        this.dataDev = data
      }
    )

  }
  checkEmail(email: string) {
    if (this.checkedMail.includes(email)) {
      this.checkedMail.splice(this.checkedMail.indexOf(email), 1)
    } else {
      this.checkedMail.push(email)
    }

  }

  addOneMemeber(email: string) {
    this.checkedMail = []
    this.checkedMail.push(email)
    this.addMembers()
  }

  addMembers() {
    this.spinner = true
    this.service
      .addMember(this.emailManager, this.checkedMail)
      .subscribe({
        next: (data: boolean) => {
          this.ngOnInit()
          this.checkedMail = []
          this.searchbar = ""
          this.dataDev = []
        },
        error: (err: any) => {
          console.log(err);
        },
        complete: () => {
          this.spinner = false
        }
      }
      );

  }



  deleteMemeber(member: string) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Es-tu sûr?',
      text: "tu veux supprimer ce développeur!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimez-le!',
      cancelButtonText: 'Non, Annuler!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          'supprimer!',
          'le membre est déja supprimer.',
          'success'
        ).then(() => {
          this.spinner = true
          this.service.deleteMember(member, this.emailManager).subscribe(
            {
              next: (data: boolean) => {
                this.ngOnInit()
              },
              error: (err: any) => {
                console.log(err);
              },
              complete: () => {
                this.spinner = false
              }

            }
          )
        })
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Anuller',
          "l'opération est annulée",
          'error'
        )
      }
    })
  }
}
