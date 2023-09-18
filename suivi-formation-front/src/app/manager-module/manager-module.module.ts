import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccueilManagerComponent } from './pages/accueil/acceuil.component';
import { FormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { RouterModule, Routes } from '@angular/router';
import { GestionDevComponent } from './pages/gestion-dev/gestion-dev.component';
import { HeaderComponent } from './components/header/header.component';
import { MembersComponent } from './pages/members/members.component';
import { PathInvalidComponent } from '../commun/pages/path-invalid/path-invalid.component';
import { TableFormationComponent } from './components/table-formation/table-formation.component';
import { DetailsFormationComponent } from './components/details-formation/details-formation.component';
import { AddEntiteComponent } from './components/add-entite/add-entite.component';
import { AddFormationComponent } from './components/add-formation/add-formation.component';
import { MatDialogModule,MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TableEntiteComponent } from './components/table-entite/table-entite.component';
import {MatChipsModule} from '@angular/material/chips';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { TableInscriptionsComponent } from './components/table-inscriptions/table-inscriptions.component';
import { CardInscriptionComponent } from './components/card-inscription/card-inscription.component';
import { InscriptionsDemandesComponent } from './components/inscriptions-demandes/inscriptions-demandes.component';
import { SpinnerComponentManager } from './components/spinner/spinner.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { EmptyAnimationComponent } from './components/empty-animation/empty-animation.component';
import { SearchEmptyAnimationComponent } from './components/search-empty-animation/search-empty-animation.component';

// Export this function
export function playerFactory(): any {  
  return import('lottie-web');
}

const routes: Routes = [
  {
    path: 'accueil',
    component: AccueilManagerComponent,
  },
  {
    path: 'members',
    component: MembersComponent,
  },
  {
    path: '**',
    component: PathInvalidComponent,
  },
];

@NgModule({
  declarations: [
    AccueilManagerComponent,
    GestionDevComponent,
    HeaderComponent,
    MembersComponent,
    TableFormationComponent,
    DetailsFormationComponent,
    AddEntiteComponent,
    AddFormationComponent,
    TableEntiteComponent,
    TableInscriptionsComponent,
    CardInscriptionComponent,
    InscriptionsDemandesComponent,
    SpinnerComponentManager,
    EmptyAnimationComponent,
    SearchEmptyAnimationComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatMenuModule,MatIconModule,
    RouterModule.forChild(routes),
    MatButtonModule,MatChipsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,MatBadgeModule,
    MatTooltipModule,
    LottieModule.forRoot({ player: playerFactory }),  

  ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} }
  ],
  exports: [AccueilManagerComponent, RouterModule],
})
export class ManagerModule {}
