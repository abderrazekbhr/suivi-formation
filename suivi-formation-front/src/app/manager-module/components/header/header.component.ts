import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements  OnInit {
  members=false;
  accueil=true;
  ngOnInit(): void {
    
  }
  deconnexion(){
    sessionStorage.clear()
  }

  toAccueil(){   
    this.accueil=true;
    this.members=false;
  }

  toMembers(){
    console.log("members");
    
    this.accueil=false;
    this.members=true;
  }


}
