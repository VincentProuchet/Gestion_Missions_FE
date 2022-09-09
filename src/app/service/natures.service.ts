import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from "rxjs";
import { environment } from 'src/environments/environment';
import { Nature } from '../model/nature';



@Injectable({
  providedIn: 'root',
})

export class NaturesService {
  //création d'une instance de Subject
  // le subject est privé
  private natures = new Subject<Nature[]>();
  private natureCreation = new Subject<Nature>();
  natureModifiee = new Subject<string>();
  natureSupprimer = new Subject<string>();


  constructor(private _http: HttpClient) {
  }
  /**
   *
   * @returns Subject 
   */
  getNatures(): Subject<Nature[]> {
    this._http.get<Nature[]>(environment.baseUrl + environment.port + "/natures")
      .subscribe(
        {
          next: (data: Nature[]) => {
            this.natures.next(data)
            console.log(data);
          }
          ,
          error: (err: any) => { console.log(err) }
        }
      )
    return this.natures;
  }

  creationNature(nature: Nature) {
    this._http.post<Nature>(environment.baseUrl + "/natures", nature)
      .subscribe(
        {
          next: (data: Nature) => {
            console.log("Création ok")
            this.natureCreation.next(data)
          },
          error: (error: any) => {
            console.log("erreur lors de la création")
          }
        }
      )
  }

  modifierNature(nature: Nature) {
    this._http.patch<string>(environment.baseUrl + "natures/modification", nature)
      .subscribe(
        {
          next: (data: string) => {
            console.log("Modification ok")
            this.natureModifiee.next(data)
          }
          ,
          error: (error: any) => {
            console.log("erreur lors de la modification");
          }
        }
      )
  }


  supprimerNature(nature: Nature) {
    this._http.delete<string>(environment.baseUrl + "natures/delete?id=" + nature.id).subscribe(
      {
        next: (data: string) => {
          this.natureSupprimer.next(data)
          console.log("suppresion", data)
        }
        ,
        error: (err: any) => {
          console.log(err);
        }
      }
    )
  }
}
