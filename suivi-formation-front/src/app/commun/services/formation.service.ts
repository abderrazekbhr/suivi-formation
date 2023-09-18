import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Formation } from 'src/app/commun/interfaces/formation';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class FormationService {
  private _baseUrl=environment.apiURL.base
  private _formtion = environment.apiURL.formation;

  constructor(private _http:HttpClient) { }



  getFormationsFiltred(email:string,filter:string,type:string ):Observable<Formation[]>{
    
    
    if(type=="Nom"){
      return this._http.get<Formation[]>(this._baseUrl+this._formtion.filter.name,{params:{emailManager:email,filter:filter}})
    
    }
    else if(type=="Description"){
    return this._http.get<Formation[]>(this._baseUrl+this._formtion.filter.desricption,{params:{emailManager:email,filter:filter}})

    }
    return this._http.get<Formation[]>(this._baseUrl+this._formtion.filter.entiteFormatrice,{params:{emailManager:email,filter:filter}})
  }
  getAllFormation(email:string):Observable<Formation[]>{
    return this._http.get<Formation[]>(this._baseUrl+this._formtion.crud.getAll,{params:{emailManager:email}})
  }

  deleteFormation(id:number):Observable<void>{
    return this._http.delete<void>(this._baseUrl+this._formtion.crud.delete,{params:{id:id}})
  }
  getFormationById(id:number):Observable<Formation>{
    return this._http.get<Formation>(this._baseUrl+this._formtion.crud.getById,{params:{id:id}})
  }
  
}
