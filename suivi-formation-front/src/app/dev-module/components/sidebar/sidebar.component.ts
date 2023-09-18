import { Component, OnInit } from '@angular/core';
import { FormationForDevService } from '../../services/formation-for-dev.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit{
  numberFavorite$:Observable<number>=new Observable<number>();
  numberEnd$:Observable<number>=new Observable<number>();
  numberAssinged$:Observable<number>=new Observable<number>();
  numberEnCours$:Observable<number>=new Observable<number>();
  constructor(private serviceFormationDev:FormationForDevService) { }

  ngOnInit(): void {
    // this.numberEnd$=this.serviceFormationDev.getEndedNumber();
    // this.numberEnCours$=this.serviceFormationDev.getEnCoursNumber()
    // this.numberAssinged$=this.serviceFormationDev.getAssingnedNumber();
    // this.numberFavorite$=this.serviceFormationDev.getFavorisNumber();
  }

}
