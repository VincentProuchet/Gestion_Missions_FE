import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
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
  //création d'une instance de Subject
  // le subject est privé
  // le tableau des natures les subjects sont abandonnés pour le moment
  private natures: Nature[] = new Array<Nature>();

  // ça c'est pour tester si votre json-server est online
  private COMPLET_URL = `http://localhost:3000/Natures`;
  // le terme à placer après l'URL de base  pour faire ses requêtes
  private API_AFTER_URL: string = "/Natures"

  constructor(private http: HttpClient) {
  }
  ngOnDestroy(): void {

  }
  /**
   *
   * @returns Subject
   */
  getNatures(): Nature[] {
    let natureObs = this.http.get<Nature[]>(`${environment.baseUrl}${environment.port}${this.API_AFTER_URL}`);
    natureObs.subscribe(
      {
        next: (data: Nature[]) => {
          this.natures = data;
          console.log(data);
        }
        ,
        error: (err: any) => { console.log(err) }
      }
    );
    // exemple de filtre pour la partie ou l'on ne devras afficher que les
    // natures ACTIVES
    //return this.natures.filter(valuer => valuer.endOfValidity == null);

    return this.natures;
  }

  creationNature(nature: Nature) {
    this.http.post<Nature>(`${environment.baseUrl}${environment.port}${this.API_AFTER_URL}`, nature)
      .subscribe(
        {
          next: (data: Nature) => {
            console.log("Création ok");
            this.natures.push(nature);
          },
          error: (error: any) => {
            console.log("erreur lors de la création")
          }
        }
      )
  }

  modifierNature(nature: Nature) {
    this.http.patch<Nature>(`${environment.baseUrl}${environment.port}${this.API_AFTER_URL}/:${nature.id}`, nature)
      .subscribe(
        {
          next: (data: Nature) => {
            console.log("Modification ok");
          }
          ,
          error: (error: any) => {
            console.log("erreur lors de la modification");
          }
        }
      )
  }


  supprimerNature(nature: Nature) {
    this.http.delete<Nature>(`${environment.baseUrl}${environment.port}${this.API_AFTER_URL}/:${nature.id}`).subscribe(
      {
        next: () => {
          // met à jour la liste locale
          this.natures.forEach((element: Nature, index: number) => {
            if (element.id == nature.id) {
              this.natures.splice(index, 1);
              console.log("suppresion", nature)
            }
          });
        }
        ,
        error: (err: any) => {
          console.log(err);
        }
      }
    )
  }
}
