import { Component, OnInit } from '@angular/core';
import { FormationForDevService } from '../../services/formation-for-dev.service';
import { ReturnedFormationForDev } from '../../interfaces/returnedFormationForDev';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-favoris',
  templateUrl: './favoris.component.html',
  styleUrls: ['./favoris.component.scss']
})
export class FavorisComponent implements OnInit {
  favoris$:Observable<ReturnedFormationForDev[]>=new Observable()
  constructor(private service:FormationForDevService)
  {

  }
  ngOnInit(): void {
    this.favoris$=this.service.getFavorisFormation()
    
  }

  refreche(data:any){
    this.ngOnInit()
  }
}
