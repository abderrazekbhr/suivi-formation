import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DevModule } from './dev-module/dev-module.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ManagerModule } from './manager-module/manager-module.module';
import { PathInvalidComponent } from './commun/pages/path-invalid/path-invalid.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { ConnexionComponent } from './commun/pages/connexion/connexion.component';
import { ResgitreComponent } from './commun/pages/resgitre/resgitre.component';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  declarations: [
    AppComponent,
    PathInvalidComponent,
    ConnexionComponent,
    ResgitreComponent,
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule,
    AppRoutingModule,
    DevModule, FormsModule, MatChipsModule,
    HttpClientModule,
    ManagerModule,
    MatButtonModule, MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
