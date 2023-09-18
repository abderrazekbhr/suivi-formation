import { Component, OnInit } from '@angular/core';
import { ManagerService } from '../../services/manager.service';
import { Observable } from 'rxjs';
import { DevPreInscription } from 'src/app/commun/interfaces/devPreInscription';

@Component({
  selector: 'app-table-inscriptions',
  templateUrl: './table-inscriptions.component.html',
  styleUrls: ['./table-inscriptions.component.scss']
})
export class TableInscriptionsComponent implements OnInit {
  allInscriptions$: Observable<DevPreInscription[]> = new Observable()
  constructor(private service: ManagerService) {

  }
  ngOnInit(): void {
    this.allInscriptions$ = this.service.getInscription(this.service.idFormationForDetails)
   
  }
  delete(email: string) {
    this.service.deleteInscription(this.service.idFormationForDetails, email).subscribe(
      {
        next: (res) => {
          this.ngOnInit()
        }
      }
    )

  }
  exportAsCSV() {
    let data;
    this.allInscriptions$.subscribe(
      (res: any) => {
        const csvRows = [];
        const headers = Object.keys(res[0]);
        csvRows.push(headers.join(""));
        for (const item of res) {
          const values = headers.map(header => item[header]);
          csvRows.push(values.join(','));
        }
        const csvData = csvRows.join('\n');
        const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
        window.open(window.URL.createObjectURL(blob));
      }
    )

  }
}
