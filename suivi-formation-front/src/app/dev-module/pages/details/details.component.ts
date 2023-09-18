import { Component, OnInit } from '@angular/core';
import { FormationForDevService } from '../../services/formation-for-dev.service';
import { ReturnedFormationForDev } from '../../interfaces/returnedFormationForDev';
import { Router } from '@angular/router';
import { Observable, Subscriber, Subscription, filter, map } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  formationData$: Observable<ReturnedFormationForDev> | null = null;
  formationEnRelation$: Observable<ReturnedFormationForDev[]> = new Observable();
  subsucrptionGetById: Subscription = new Subscription();
  subsucrptionInscrireFormation: Subscription = new Subscription();
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
  id: number = 0;
  urlPhoto = "http://localhost:8080/formation/get-photo?idFormation="
  formation: ReturnedFormationForDev | null = null;
  constructor(
    private formationFormDev: FormationForDevService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = parseInt(this.router.url.split('/')[2])
    console.log(this.id)
    this.subsucrptionGetById = this.formationFormDev.getForamtionById(
      this.id
    ).subscribe({
      next: (result) => {
        this.formation = result;
        this.formationEnRelation$ = this.formationFormDev.getFormationEnRelation(this.formation.categorie).pipe(
          map((formation) => {
            return formation.filter((formation) => formation.idFormation != this.formation?.idFormation)
          })
        );

      }
    })


  }
  inscrire() {
    this.formationFormDev.inscrireFormation(this.formation?.idFormation as number).subscribe({
      next: (result) => {
        this.router.navigate(['/dev', 'mes-formation', 'assigne'])
      }
    })
  }
  relaodDetails(data: any) {
    this.ngOnInit()
  }

  ngOnDestroy(): void {
    this.subsucrptionGetById.unsubscribe();
    this.subsucrptionInscrireFormation.unsubscribe();
  }


}
