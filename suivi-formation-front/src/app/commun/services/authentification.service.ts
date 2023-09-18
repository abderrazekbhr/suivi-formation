import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { User } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dev } from '../interfaces/dev';

@Injectable({
  providedIn: 'root',
})
export class AuthentificationService {
  private _baseUrl = environment.apiURL.base;
  private _loginUrl = this._baseUrl + environment.apiURL.user.login;
  private _registreUrl = this._baseUrl + environment.apiURL.user.registre;
  private _updateDev=environment.apiURL.user.dev.update
  constructor(private _http: HttpClient) {}

  login(loginData: {
    email: string;
    password: string;
  }): Observable<{
    state: boolean;
    provider?: string;
    role: string;
    equipe?: string;
  }> {
    return this._http.post<{
      state: boolean;
      role: string;
      provider?: string;
      equipe?: string;
    }>(this._loginUrl, loginData);
  }

  getDevData(): Observable<Dev> {
    return this._http.get<Dev>(this._baseUrl + '/dev', {
      params: {
        emailDev: sessionStorage.getItem('emailDev') as string,
      },
    });
  }


  registre(user: User,categorie:string[]): Observable<boolean> {
    return this._http.post<boolean>(this._registreUrl, user,{params:{categories:categorie}});
  }

  updateDev( d:Dev):Observable<boolean>{
    return this._http.put<boolean>(this._baseUrl+this._updateDev,d);
  }
}
