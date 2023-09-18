import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { EntiteFormatrice } from '../interfaces/entiteFomatrice';
import { Observable } from 'rxjs';
import { Formation } from 'src/app/commun/interfaces/formation';
import { FiltredDev } from '../interfaces/filtredDev';
import { DevPreInscription } from 'src/app/commun/interfaces/devPreInscription';
@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  private _baseURL = environment.apiURL.base;
  private _entiteFormatrice = environment.apiURL.entiteFormatrice;
  private _formtion = environment.apiURL.formation;
  private _manager = environment.apiURL.user.manager;
  idFormationForDetails:number=0;
  
  constructor(private _http:HttpClient) { }
  getAllEntite():Observable<EntiteFormatrice[]>{
    return this._http.get<EntiteFormatrice[]>(this._baseURL+this._entiteFormatrice.crud.getAll)  
  }
  addEntite(entite:EntiteFormatrice):Observable<EntiteFormatrice>{
    return this._http.post<EntiteFormatrice>(this._baseURL+this._entiteFormatrice.crud.add,entite)
  }

  addFormation(formation:FormData):Observable<boolean>{
    return this._http.post<boolean>(this._baseURL+this._formtion.crud.add,formation)
  }
  
  getMemberByEmail(email:string):Observable<FiltredDev[]>{
    return this._http.get<FiltredDev[]>(this._baseURL+this._manager.filtred,{params:{emailDev:email,emailManager:sessionStorage.getItem('emailManager') as string}})
  }

  deleteMember(emailDev:string,emailManager:string):Observable<boolean>{
    return this._http.delete<boolean>(this._baseURL+this._manager.delete,{params:{emailDev:emailDev,emailManager:emailManager}})
  }
  addMember(emailManager:string,emailsDev:string[]):Observable<boolean>{
    return this._http.post<boolean>(this._baseURL+this._manager.addDevs,{emailsDev:emailsDev,emailManager:emailManager})
  }

  getMembers(emailManager:string):Observable<string[]>{
    return this._http.get<string[]>(this._baseURL+this._manager.mangerEquipe,{params:{emailManager:emailManager}})
  }

  getEntiteByFilter(type:string,filter:string):Observable<EntiteFormatrice[]>{
    if(type=="Nom"){
      return this._http.get<EntiteFormatrice[]>(this._baseURL+this._entiteFormatrice.crud.filterNom,{params:{filter:filter}})
    }
      return this._http.get<EntiteFormatrice[]>(this._baseURL+this._entiteFormatrice.crud.filterDescription,{params:{filter:filter}})
  }

  deleteEntite(id:number){
    return this._http.delete<boolean>(this._baseURL+this._entiteFormatrice.crud.delete,{params:{id:id}})
  }

  updateEntite(entite:EntiteFormatrice){
    return this._http.put<boolean>(this._baseURL+this._entiteFormatrice.crud.update,entite);
  }

  getEntiteById(id:number):Observable<EntiteFormatrice>{
    return this._http.get<EntiteFormatrice>(this._baseURL+this._entiteFormatrice.crud.get,{params:{id:id}})
  }

  test(){
    const formData=new FormData()
    formData.append("test","test")
    return this._http.post(this._baseURL+"/dev/test",formData)
  }

  getPreInscrit(id:number):Observable<DevPreInscription[]>{
    return this._http.get<DevPreInscription[]>(this._baseURL+this._formtion.preinscription.getPreInscritForManager,{
      params:{
        idFormation:id
      }
    })

  }

  acceptPreInscription(idFormation:number,emailDev:string){
    return this._http.post(
      this._baseURL+this._formtion.inscription.confirm,{

      },
      {
        params:{
          idFormation:idFormation,
          emailDev:emailDev
        }
      }
    )
  }
  confirmFormation(idFormation:number){
    return this._http.post(
      this._baseURL+this._formtion.inscription.confirmFormation,{
      },
      {
        params:{
          idFormation:idFormation
        }
      }
    )
  }
  
  getInscription(id:number):Observable<DevPreInscription[]>{
    return this._http.get<DevPreInscription[]>(this._baseURL+this._formtion.inscription.getInscriptionByFormation,{
      params:{
        idFormation:id
      }
    })
  }
  deleteInscription(idFormation:number,emailDev:string){
    return this._http.delete<boolean>(this._baseURL+this._formtion.inscription.delete,{
      params:{
        idFormation:idFormation,
        emailDev:emailDev
      }
    })
  }

}
