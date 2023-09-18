import { Component, OnInit } from '@angular/core';
import { FormationForDevService } from '../../services/formation-for-dev.service';
import { Observable } from 'rxjs';
import { ReturnedFormationForDev } from '../../interfaces/returnedFormationForDev';
import { NgForm } from '@angular/forms';
import { Certif } from '../../interfaces/certif';

@Component({
  selector: 'app-add-certif',
  templateUrl: './add-certif.component.html',
  styleUrls: ['./add-certif.component.scss']
})
export class AddCertifComponent implements OnInit {
  endedFormations$: Observable<ReturnedFormationForDev[]>=new Observable()
  photo : File|null =null

  constructor(private service:FormationForDevService){

  }
  ngOnInit(): void {
    this.endedFormations$= this.service.getFormationEnded();
  }
  addCertif(certif:NgForm){
    let certifData = new FormData()
    certifData.append('photo',this.photo as File)
    certifData.append('cetifName',certif.value.cetifName)
    certifData.append('validationDateStart',certif.value.validationDateStart)
    certifData.append('validationDateEnd',certif.value.validationDateEnd)
    certifData.append('idFormation',certif.value.idFormation)
    certifData.append('emailDev',sessionStorage.getItem('emailDev') as string)
    this.service.addCertif(certifData).subscribe({
      next:(result)=>{
        console.log(result)
      }
    })
  }

  onFileSelected(event: any) {
    this.photo = event.target.files[0];
  }

}
