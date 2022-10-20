import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import * as Notiflix from 'notiflix';
import { Subscription } from 'rxjs';
import { API_Route } from 'src/environments/API_route';
import { AP_Vars } from 'src/environments/API_Vars';
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
  public natures: Nature[] = [];
  public natureToModify!: Nature;

  constructor(private http: HttpClient, private router: Router) {

  }
  ngOnDestroy(): void {
  }
  /**
   *pour obtenir la liste des natures
   * @returns Subject de Natures
   */
  getNatures(): Subscription {
    // exemple de filtre pour la partie ou l'on ne devras afficher que les
    // natures ACTIVES
    //return this.natures.filter(valuer => valuer.endOfValidity == null);
    return this.http.get<Nature[]>(`${AP_Vars.BEConnectionUrl}/${this.API_AFTER_URL}`).subscribe(
      {
        next: (data: Nature[]) => { this.natures = data }
        ,
        error: (err: HttpErrorResponse) => { Notiflix.Notify.failure(err.error.message); }
      }
    );

  }
  /**
    get a nature Data using the provided id
  *
 * @param id nature id
 * @returns a subject that you can make a subscribe on it
 */
  getNature(id: number): Subscription {
    return this.http.get<Nature>(`${AP_Vars.BEConnectionUrl}/${this.API_AFTER_URL}/${id}`).subscribe(
      {
        next: (data: Nature) => {
          this.natureToModify = data;
        }
        , error: (e: HttpErrorResponse) => {
          Notiflix.Notify.failure(e.error.message);
        }
      }
    );
  }



  /**applique un filtre sur le tableau de nature passé en paramètre
   * @param data tableau de natures
   * @returns seuelement les nature dont la date de validité est nulle
   */
  getValidNatures(data: Nature[]): Nature[] {
    let now: Date = new Date(Date.now());
    //return data.filter(value => value.endOfValidity == null);
    return data.filter(value => ((value.endOfValidity == null) || (now.getTime() < new Date(value.endOfValidity).getTime())));
  }

  /**
   * créer une nouvelle nature
   * @param nature la nature à créer
   */
  creationNature(nature: Nature): Subscription {
    return this.http.post<Nature>(`${AP_Vars.BEConnectionUrl}/${this.API_AFTER_URL}`, nature)
      .subscribe(
        {
          next: () => {
            this.router.navigate(['/gestionDesNatures'])
            Notiflix.Notify.success(`la nature ${nature.description} à été crée avec succés `);
          }
          , error: (err: HttpErrorResponse) => {
            Notiflix.Notify.failure(err.error.message);
          }
          , complete: () => {
          }
        });
  }
  /**
   * à mettre à jour une nature
   * @param nature à mettre à jour
   * @returns
   */
  modifierNature(id: number, nature: Nature): Subscription {
    return this.http.put<Nature>(`${AP_Vars.BEConnectionUrl}/${this.API_AFTER_URL}/${id}`, nature).subscribe(
      {
        next: () => {
          this.router.navigate(['gestionDesNatures'])
          Notiflix.Notify.success(`la nature ${nature.description} à bien été mise à jour`);
        }
        , error: (err: HttpErrorResponse) => {
          Notiflix.Notify.failure(err.error.message);
        }
      }
    );
  }

  /**
   * supprimer un nature
    On a plus besoin d'envoyer l'utilisateur connecté
    c'est srping security qui s'en occupe
   * @param nature à supprimer
   * @returns
   */
  supprimerNature(nature: Nature): Subscription {
    return this.http.delete<Nature>(`${AP_Vars.BEConnectionUrl}/${this.API_AFTER_URL}/${nature.id}`)
      .subscribe({
        next: () => {
          Notiflix.Notify.success(`la nature : ${nature.description} \n a été supprimée avec succés`);
        }
        , error: (err: HttpErrorResponse) => {
          Notiflix.Notify.failure(err.error.message);
        }
        , complete: () => {
        }
      });

  }



}
