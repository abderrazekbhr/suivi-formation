import { Component, OnInit } from '@angular/core';
import { FormationForDevService } from '../../services/formation-for-dev.service';
import { Observable } from 'rxjs';
import { ReturnedFormationForDev } from '../../interfaces/returnedFormationForDev';

@Component({
  selector: 'app-en-cours',
  templateUrl: './en-cours.component.html',
  styleUrls: ['./en-cours.component.scss']
})
export class EnCoursComponent implements OnInit {
  formationEncours$:Observable<ReturnedFormationForDev[]>=new Observable()
  constructor(private service:FormationForDevService ){

  }
  ngOnInit(): void {
    this.formationEncours$=this.service.getFormationEnCours();
  }
}
