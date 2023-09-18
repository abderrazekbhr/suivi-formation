import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';
import { ReturnedFormationForDev } from '../interfaces/returnedFormationForDev';

@Injectable({
  providedIn: 'root',
})
export class FormationForDevService implements OnInit {
  
  _formationNumber = {
    encours: 0,
    termine: 0,
    assigne: 0,
    favoris: 0
  }
  data: ReturnedFormationForDev[] = [];
  recommended: ReturnedFormationForDev[] = [];

  private _urlBase = environment.apiURL.base;
  private _urlFormation = environment.apiURL.user.dev.getFormation;
  private _urlAddRemoveFavorite = environment.apiURL.user.dev.favoriteAddRemove;
  private _urlNumberFavoris = environment.apiURL.user.dev.numberFavoris;
  private _urlNumberAssinged = environment.apiURL.user.dev.numberAssinged;
  private _urlNumberEnCours = environment.apiURL.user.dev.numberEnCours;
  private _urlNumberEnded = environment.apiURL.user.dev.numberEnded;
  private _urlGetFormationById = environment.apiURL.user.dev.foramtionById;
  private _urlFavoris = environment.apiURL.user.dev.getFavoris
  private _urlRecommended = environment.apiURL.user.dev.getRecommended
  private _urlEnRelation = environment.apiURL.user.dev.getEnRelation
  private _urlInscrireFormation = environment.apiURL.formation.preinscription.inscrireFormation
  private _urlPreInscription = environment.apiURL.formation.preinscription.getPreIns
  private _urlDeletePreInscrit = environment.apiURL.formation.preinscription.delete
  private _urlConfirmed = environment.apiURL.formation.inscription.getConfirmed
  private _endFormation = environment.apiURL.formation.inscription.termine
  private _enCours = environment.apiURL.formation.inscription.enCours
  private _addCertif=environment.apiURL.certif.add
  private _getCertif=environment.apiURL.certif.getAll
  private _deleteCertif=environment.apiURL.certif.delete
  constructor(private _http: HttpClient) { }
  ngOnInit() {
    this.getFormationForDev()
      .subscribe({
        next: (result) => {
          this.data = result;
        },
      });
    this.getRecommededFormation()
      .subscribe({
        next: (result) => {
          this.recommended = result
        }
      })

  }


  getFormationForDev(): Observable<ReturnedFormationForDev[]> {
    return this._http.get<ReturnedFormationForDev[]>(
      this._urlBase + this._urlFormation,
      {
        params: {
          emailDev: sessionStorage.getItem('emailDev') as string,
          emailManager: sessionStorage.getItem('provider') as string,
        },
      }
    );
  }

  getFormationEnCours(): Observable<ReturnedFormationForDev[]> {
    return this._http.get<ReturnedFormationForDev[]>(
      this._urlBase + this._enCours,
      {
        params: {
          emailDev: sessionStorage.getItem('emailDev') as string,
        },
      })
  }

  getFormationEnded(): Observable<ReturnedFormationForDev[]> {
    return this._http.get<ReturnedFormationForDev[]>(
      this._urlBase + this._endFormation,
      {
        params: {
          emailDev: sessionStorage.getItem('emailDev') as string,
        },
      })
  }


  getForamtionById(id: number): Observable<ReturnedFormationForDev> {
    return this._http.get<ReturnedFormationForDev>(
      this._urlBase + this._urlGetFormationById,
      {
        params: {
          idFormation: id,
        },
      }
    );
  }

  addFavoriteFormation(idFormation: number): Observable<boolean> {
    return this._http.post<boolean>(
      this._urlBase + this._urlAddRemoveFavorite,
      {},
      {
        params: {
          idFormation: idFormation,
          emailDev: sessionStorage.getItem('emailDev') as string,
        },
      }
    );
  }

  getFavorisNumber(): Observable<number> {
    return this._http.get<number>(this._urlBase + this._urlNumberFavoris, {
      params: {
        emailDev: sessionStorage.getItem('emailDev') as string,
      },
    })
  }

  getAssingnedNumber(): Observable<number> {
    return this._http.get<number>(this._urlBase + this._urlNumberAssinged, {
      params: {
        emailDev: sessionStorage.getItem('emailDev') as string,
      },
    });
  }

  getEnCoursNumber(): Observable<number> {
    return this._http.get<number>(this._urlBase + this._urlNumberEnCours, {
      params: {
        emailDev: sessionStorage.getItem('emailDev') as string,
      },
    });
  }

  getEndedNumber(): Observable<number> {
    return this._http.get<number>(this._urlBase + this._urlNumberEnded, {
      params: {
        emailDev: sessionStorage.getItem('emailDev') as string,
      },
    });
  }

  getRecommededFormation(): Observable<ReturnedFormationForDev[]> {
    return this._http.get<ReturnedFormationForDev[]>(
      this._urlBase + this._urlRecommended,
      {
        params: {
          emailDev: sessionStorage.getItem('emailDev') as string,
          emailManager: sessionStorage.getItem('provider') as string,

        },
      }
    );
  }

  getFavorisFormation(): Observable<ReturnedFormationForDev[]> {
    return this._http.get<ReturnedFormationForDev[]>(
      this._urlBase + this._urlFavoris,
      {
        params: {
          emailDev: sessionStorage.getItem('emailDev') as string,
        },
      }
    );
  }



  getFormationEnRelation(categorie: string): Observable<ReturnedFormationForDev[]> {
    return this._http.get<ReturnedFormationForDev[]>(
      this._urlBase + this._urlEnRelation,
      {
        params: {
          emailDev: sessionStorage.getItem('emailDev') as string,
          emailManager: sessionStorage.getItem('provider') as string,
          categorie: categorie
        },
      }
    );
  }
  inscrireFormation(idFormation: number): Observable<boolean> {
    return this._http.post<boolean>(
      this._urlBase + this._urlInscrireFormation, {},
      {
        params: {
          emailDev: sessionStorage.getItem('emailDev') as string,
          idFormation: idFormation
        },
      }
    );
  }

  getPreInscription(): Observable<ReturnedFormationForDev[]> {
    return this._http.get<ReturnedFormationForDev[]>(this._urlBase + this._urlPreInscription, {
      params: {
        emailDev: sessionStorage.getItem("emailDev") as string
      }
    })
  }

  deletePreInscription(id: number, email: string) {
    return this._http.delete(
      this._urlBase + this._urlDeletePreInscrit, {
      params: {
        emailDev: email,
        idFormation: id
      }
    }
    )
  }


  getPhoto() {
    return this._http.get(
      this._urlBase + environment.apiURL.formation.crud.getPhoto, {
      params: {
        idFormation: 1253
      }
    }
    )
  }



  returnedonfirmedFormation(): Observable<ReturnedFormationForDev[]> {
    return this._http.get<ReturnedFormationForDev[]>(
      this._urlBase + this._urlConfirmed, {
      params: {
        emailDev: sessionStorage.getItem("emailDev") as string
      }
    }

    )
  }
  addCertif(certif: FormData) {
    return this._http.post(
      this._urlBase + this._addCertif, certif
    )
  }

  getCertif() {
    return this._http.get(
      this._urlBase + this._getCertif, {
      params: {
        emailDev: sessionStorage.getItem("emailDev") as string
      }
    }
    )
  }
  
}
