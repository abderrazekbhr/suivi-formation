import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { CardComponent } from './components/card/card.component';
import { AccueilDevComponent } from './pages/accueil/accueil.component';
import { RouterModule, Routes } from '@angular/router';
import { CrousselComponent } from './components/croussel/croussel.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PathInvalidComponent } from '../commun/pages/path-invalid/path-invalid.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DetailsComponent } from './pages/details/details.component';
import { AssigneComponent } from './pages/assigne/assigne.component';
import { EnCoursComponent } from './pages/en-cours/en-cours.component';
import { TermineComponent } from './pages/termine/termine.component';
import { FavorisComponent } from './pages/favoris/favoris.component';
import { ParametreComponent } from './pages/parametre/parametre.component';
import { PreinscriptionComponent } from './components/preinscription/preinscription.component';
import { ConfirmeComponent } from './components/confirme/confirme.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { CertifComponent } from './pages/certif/certif.component';
import {MatDialogModule} from '@angular/material/dialog';
import { AddCertifComponent } from './components/add-certif/add-certif.component';
import { CertifCardComponent } from './components/certif-card/certif-card.component';
import { EmptySearchComponent } from './components/empty-search/empty-search.component';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { EmptyBoxComponent } from './components/empty-box/empty-box.component';

const routes: Routes = [
  {
    path: 'accueil',
    component: AccueilDevComponent,
  },
  // {
  //   path: 'profil',
  //   component: ProfilComponent,
  // },
  {
    path: 'parametre',
    component: ParametreComponent,
  },
  {
    path:'mes-formation',children: [
      {
        path:'assigne',component:AssigneComponent
      },
      {
        path:'favoris',component:FavorisComponent
      },
      {
        path:'en-cours',component:EnCoursComponent
      },
      {
        path:'termine',component:TermineComponent
      },
      {
        path:'certif',component:CertifComponent
      },
      {
        path:'**',component:PathInvalidComponent
      },
    ]
  },
  {
    path: ':id',
    component: DetailsComponent,
  },
  {
    path: '**',
    component: PathInvalidComponent,
  },
  
];
export function playerFactory(): any {  
  return import('lottie-web');
}
@NgModule({
  declarations: [
    HeaderComponent,
    CardComponent,
    AccueilDevComponent,
    SpinnerComponent,
    CrousselComponent,
    SidebarComponent,
    DetailsComponent,
    AssigneComponent,
    EnCoursComponent,
    TermineComponent,
    FavorisComponent,
    ParametreComponent,
    PreinscriptionComponent,
    ConfirmeComponent,
    CertifComponent,
    AddCertifComponent,
    CertifCardComponent,
    EmptySearchComponent,
    EmptyBoxComponent
  ],
  imports: [CommonModule, FormsModule, RouterModule.forChild(routes),HttpClientModule,MatProgressBarModule,MatDialogModule,
    LottieModule.forRoot({ player: playerFactory }),  
    MatChipsModule,
    MatButtonModule,MatMenuModule
  ],
  exports: [RouterModule, HeaderComponent, AccueilDevComponent],
})
export class DevModule {}
