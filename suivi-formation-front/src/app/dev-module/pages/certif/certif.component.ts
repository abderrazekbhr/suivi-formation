import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddCertifComponent } from '../../components/add-certif/add-certif.component';

@Component({
  selector: 'app-certif',
  templateUrl: './certif.component.html',
  styleUrls: ['./certif.component.scss']
})
export class CertifComponent implements OnInit {
  
    constructor(private matDialog:MatDialog) { }
    ngOnInit(): void {
      
    }
    addCertif(){  
      const certifDialog=this.matDialog.open(
        AddCertifComponent
      )
      certifDialog.afterClosed().subscribe(result=>{
        this.ngOnInit()
        
      }
      )
    }


}
