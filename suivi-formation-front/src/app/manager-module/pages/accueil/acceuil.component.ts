import { Component, OnInit } from '@angular/core';
import { ManagerService } from '../../services/manager.service';
import { Observable } from 'rxjs';
import { EntiteFormatrice } from '../../interfaces/entiteFomatrice';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-manager-acceuil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss'],
})
export class AccueilManagerComponent implements OnInit {
  showFormation: boolean = false;
  showEntite: boolean = false;
  emailManager: string = sessionStorage.getItem('emailManager') as string;
  entiteFormatice$: Observable<EntiteFormatrice[]> = new Observable<
    EntiteFormatrice[]
  >();
  formationEntiteTabsState:boolean=true;
  changeTabToFormation(){
    this.formationEntiteTabsState=true;

  }
  
  changeTabToEntite(){
    this.formationEntiteTabsState=false;
  
  }


  constructor(
    public dialog: MatDialog,
    private service: ManagerService,
  ) {}
  msgEntite: string = '';
  msgFormation: string = '';
  toastEntiteState: boolean = false;
  toastFormationState: boolean = false;
  sucess: boolean = false;
  
  ngOnInit(): void {
  }

  addEntite(elt: any) {
    this.service.addEntite(elt.value).subscribe({
      next: (result) => {
        this.toastEntiteState = true;
        this.msgEntite = 'Entité ajoutée avec succés';
        elt.reset();

        setTimeout(() => {
          this.toastEntiteState = false;
        }, 1000);
      },
    });
  }
}

