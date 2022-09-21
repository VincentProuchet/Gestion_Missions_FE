import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { map, Observable, Subject, Subscription } from 'rxjs';
import { API_Route } from 'src/environments/API_route';
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
  // ça c'est pour tester si votre json-server est online ne pas mettre dans le code
  private FULL_URL = `http://localhost:3000/nature`;
  // le terme à placer après l'URL de base  pour faire ses requêtes
  private API_AFTER_URL: string = API_Route.NATURE;
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
    return this.http.get<Nature[]>(`${environment.baseUrl}${this.API_AFTER_URL}`)

  }

  /**get the mission nature Data with the provideed id
   *
   * @param id nature id
   * @returns a subject that you can make a subscribe on it
   */
  getNature(id: number): Observable<Nature> {
    return this.http.get<Nature>(`${environment.baseUrl}${this.API_AFTER_URL}/${id}`);
  }

  /**applique un filtre sur le tableau de nature passé en paramètre
   * @param data tableau de natures
   * @returns seuelement les nature dont la date de validité est nulle
   */
  getValidNatures(data: Nature[]): Nature[] {
    return data.filter(value => value.endOfValidity == null)
  }

  /**
   * créer une nouvelle nature
   * @param nature la nature à créer
   */
  creationNature(nature: Nature): Observable<Nature> {
    return this.http.post<Nature>(`${environment.baseUrl}${this.API_AFTER_URL}`, nature)
  }
  /**
   * à mettre à jour une nature
   * @param nature à mettre à jour
   * @returns
   */
  modifierNature(id: number, nature: Nature): Observable<Nature> {
    return this.http.put<Nature>(`${environment.baseUrl}${this.API_AFTER_URL}/${id}`, nature);
  }

  /**
   * supprimer un nature
   * @param nature à supprimer
   * @returns
   */
  supprimerNature(nature: Nature): Observable<Nature> {
    const option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {

        Collaborator: {
          id: 0,

        },
        token: {
          refreshToken: "qffqsdfqsdfsdfqsfd"
        }
      }
    }
    return this.http.delete<Nature>(`${environment.baseUrl}${this.API_AFTER_URL}/${nature.id}`, option);
  }


  /*
    getNaturesAsString():Observable<String[]> {
      return this.http.get<Nature[]>(`${environment.baseUrl}${environment.port}${this.API_AFTER_URL}`).pipe(map(natures => natures.map(nature => nature.description)));
    }*/
}
