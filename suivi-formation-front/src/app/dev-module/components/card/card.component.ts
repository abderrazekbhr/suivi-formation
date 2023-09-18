import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Formation } from 'src/app/commun/interfaces/formation';
import { ReturnedFormationForDev } from '../../interfaces/returnedFormationForDev';
import { FormationForDevService } from '../../services/formation-for-dev.service';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  path = "/"
  @Input() inProgress=false
  categorie: any = {
    "web": "Développement Web",
    "mobile": "Développement Mobile",
    "bd": "Base de données",
    "reseau": "Réseaux et Sécurité",
    "devops": "DevOps",
    "gestion": "Gestion de projet",
    "cloud": "Cloud",
    "ia": "IA",
  };

  @Input() dataFormation: ReturnedFormationForDev | null = null;
  @Input() likeState: boolean = true;
  @Output() favoriteEvent = new EventEmitter<boolean>();
  @Output() navigateToDetailsEvent = new EventEmitter<boolean>();
  spinner = false;
  subscriptionAddFavoris: Subscription = new Subscription();
  favorite: boolean = false;
  urlPhoto = ""
  constructor(private seviceFormationDev: FormationForDevService, private router: Router) {
  }

  ngOnInit(): void {
    this.path = "/dev/" + this.dataFormation?.idFormation
    this.urlPhoto = "http://localhost:8080/formation/get-photo?idFormation=" + this.dataFormation?.idFormation
  }
  addToFavorit() {

    if (this.dataFormation != null) {
      if (this.dataFormation.idFormation != null) {
        this.subscriptionAddFavoris = this.seviceFormationDev.addFavoriteFormation(this.dataFormation.idFormation).subscribe({
          next: (result) => {
          },
          error: (error) => {
            console.log(error);
          },
          complete: () => {
              this.favorite = !this.favorite;
              this.favoriteEvent.emit(true);
          }
        });

      }
    }
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


   navigateToDetails() {
    this.router.navigate(["/dev", this.dataFormation?.idFormation, ]).then(
      () => {
        this.navigateToDetailsEvent.emit(true);
      }
    )
  }

  ngOnDestroy(): void {
    this.subscriptionAddFavoris.unsubscribe();
  }

}
