import { Component } from '@angular/core';

@Component({
  selector: 'app-assigne',
  templateUrl: './assigne.component.html',
  styleUrls: ['./assigne.component.scss']
})
export class AssigneComponent {
  sider:boolean=true;
  
  changeToPreInscription(){
    this.sider=true
  }
  changeToConfirme(){
    this.sider=false
  }
}
