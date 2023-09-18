import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ReturnedFormationForDev } from '../../interfaces/returnedFormationForDev';
import { FormationForDevService } from '../../services/formation-for-dev.service';

@Component({
  selector: 'app-termine',
  templateUrl: './termine.component.html',
  styleUrls: ['./termine.component.scss']
})
export class TermineComponent implements OnInit{
  endedFormations$: Observable<ReturnedFormationForDev[]>=new Observable()
  constructor(private service:FormationForDevService){

  }
  ngOnInit(): void {
    this.endedFormations$=this.service.getFormationEnded();
  }
}
