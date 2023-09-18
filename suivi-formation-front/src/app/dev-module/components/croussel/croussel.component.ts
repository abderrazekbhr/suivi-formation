import { Component, OnInit } from '@angular/core';
import { FormationForDevService } from '../../services/formation-for-dev.service';
import { ReturnedFormationForDev } from '../../interfaces/returnedFormationForDev';
import { Observable, Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-croussel',
  templateUrl: './croussel.component.html',
  styleUrls: ['./croussel.component.scss'],
})
export class CrousselComponent implements OnInit {
  recomendedForDev:ReturnedFormationForDev[] =[];
  subscibtionRecommended: Subscription = new Subscription();
  constructor(
    private service: FormationForDevService,
  ) { }
  ngOnInit(): void {
    this.loadRecomended();

  }

  loadRecomended() {
    this.subscibtionRecommended=this.service.getRecommededFormation().subscribe({
      next: (result) => {
        this.recomendedForDev = result;
      }
    });
  }
  
  reloadContent(recomended: any) {
    this.service.ngOnInit();
    this.ngOnInit();
  }

  ngOnDestroy(): void {
    this.subscibtionRecommended.unsubscribe();
  }
}
