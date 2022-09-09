import { Injectable } from '@angular/core';
import { Nature } from '../nature-mission/Natures';
import { HttpClient } from '@angular/common/http';
import {Subject} from "rxjs";
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root',
})
export class NaturesService {
  //création d'une instance de Subject
  // le subject est privé
  private natures = new Subject<Nature[]>();
  private natureCreation = new Subject<string>();
  natureModifiee = new Subject<string>();
  natureSupprimer = new Subject<string>();
  nature: Nature;

  constructor(private _http: HttpClient) {
  }

  getNatures() {
    this._http.get<Nature[]>(environment.baseUrl + "natures")
      .subscribe((data: Nature[]) => {
        this.natures.next(data)
      }, (err: any) => {
        console.log(err)
      }
      )
  }

  creationNature(nature: Nature) {
    this._http.post<string>(environment.baseUrl + "natures/ajout", nature)
      .subscribe((data: string) => {
        console.log("Création ok")
        this.natureCreation.next(data)
      }, (error: any) => {
        console.log("erreur lors de la création")
      })
  }

  modifierNature(nature: Nature) {
    this._http.patch<string>(environment.baseUrl + "natures/modification", nature)
      .subscribe((data: string) => {
        console.log("Modification ok")
        this.natureModifiee.next(data)
      }, (error: any) => {
        console.log("erreur lors de la modification");
      })
  }


  supprimerNature(nature: Nature) {
    this._http.delete<string>(environment.baseUrl + "natures/delete?id=" + nature.id).subscribe((data: string) => {
      this.natureSupprimer.next(data)
      console.log(data)
    }, (err: any) => {
      console.log(err);
    })
  }
}
