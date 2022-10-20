import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as Notiflix from 'notiflix';
import { map, Subscription } from 'rxjs';
import { AP_Vars } from 'src/environments/API_Vars';
import { Collaborator } from '../model/collaborator';

/**
 * Service collaborator
 * Non utilisé
 * @date 21/09/2022 - 12:12:32
 *
 * @export
 * @class CollaboratorService
 * @typedef {CollaboratorService}
 */
@Injectable({
  providedIn: 'root'
})
export class CollaboratorService {

  private API_AFTER_URL: Readonly<string> = "collaborator";
  /** listre de collaborator */
  public collaborators: Collaborator[] = [];
  /** collaborator  */
  public collaborator!: Collaborator;
  /**
   * Creates an instance of CollaboratorService.
   * @date 21/09/2022 - 12:12:32
   *
   * @constructor
   */
  constructor(private http: HttpClient) { }


  getCollaborators(): Subscription {
    return this.http.get<Collaborator[]>(`${AP_Vars.BEConnectionUrl}/${this.API_AFTER_URL}`).subscribe(
      {
        next: (data: Collaborator[]) => { this.collaborators = data; }
        , error: (e: HttpErrorResponse) => { Notiflix.Notify.failure(e.error.message); }
        , complete: () => { }
      }
    );
  }


}
