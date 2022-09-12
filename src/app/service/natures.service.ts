import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { map, Observable, Subject, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Nature } from '../model/nature';



@Injectable({
  providedIn: 'root',
})
/**
 * Ce Service communique avec L'API
 * recupére les natures de missions
 * et les conserve en tant que subject
 * {c'est pour le cas ou il y en aurrait une très longue liste}
 *
 */
export class NaturesService implements OnDestroy {
  // ça c'est pour tester si votre json-server est online
  private FULL_URL = `http://localhost:3000/Natures`;
  // le terme à placer après l'URL de base  pour faire ses requêtes
  private API_AFTER_URL: string = "/Natures"
  //private natures: Subject<Nature[]> = new Subject()
  constructor(private http: HttpClient) {


  }
  ngOnDestroy(): void {

  }
  /**
   *pour obtenir la liste des natures
   * @returns Subject de Natures
   */
  getNatures(): Observable<Nature[]> {
    // exemple de filtre pour la partie ou l'on ne devras afficher que les
    // natures ACTIVES
    //return this.natures.filter(valuer => valuer.endOfValidity == null);
    return this.http.get<Nature[]>(`${environment.baseUrl}${environment.port}${this.API_AFTER_URL}`)
      /*.subscribe(
        {
          next: (data) => { this.natures.next(data) }
          , error: (err) => {
            console.log(err);
          }
        }
      )
    return this.natures;*/
  }
  /**applique un filtre sur le tableau de nature passé en paramètre
   * @param data
   * @returns
   */
  getValidNatures(data: Nature[]): Nature[] {
    return data.filter(value => value.endOfValidity == null)
  }

  /**
   * créer une nouvelle nature
   * @param nature la nature à créer
   */
  creationNature(nature: Nature) : Observable<Nature> {
    return this.http.post<Nature>(`${environment.baseUrl}${environment.port}${this.API_AFTER_URL}`, nature)
    /*
      .subscribe(
        {
          next: (data: Nature) => {
            console.log("Création ok");
            // this.natures.push(nature);
          },
          error: (error: any) => {
            console.log("erreur lors de la création")
          }
        }
      )*/
  }
  /**
   * à mettre à jour une nature
   * @param nature à mettre à jour
   * @returns
   */
  modifierNature(nature: Nature): Observable<Nature> {
    return this.http.patch<Nature>(`${environment.baseUrl}${environment.port}${this.API_AFTER_URL}/:${nature.id}`, nature);
  }

  /**
   * supprimer un nature
   * @param nature à supprimer
   * @returns
   */
  supprimerNature(nature: Nature): Observable<Nature> {
    return this.http.delete<Nature>(`${environment.baseUrl}${environment.port}${this.API_AFTER_URL}/${nature.id}`)
  }
/*
  getNaturesAsString():Observable<String[]> {
    return this.http.get<Nature[]>(`${environment.baseUrl}${environment.port}${this.API_AFTER_URL}`).pipe(map(natures => natures.map(nature => nature.description)));
  }*/
}
