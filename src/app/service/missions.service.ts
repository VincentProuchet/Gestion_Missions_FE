import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { API_Route } from 'src/environments/API_route';
import { environment } from 'src/environments/environment';
import { Mission } from '../model/mission';

/**
 * Description placeholder
 * @date 21/09/2022 - 11:48:21
 *
 * @export
 * @class MissionsService
 * @typedef {MissionsService}
 */
@Injectable({
  providedIn: 'root'
})

export class MissionsService {
  // url de test du json-server
  /**
   * Description placeholder
   * @date 21/09/2022 - 11:48:21
   *
   * @private
   * @type {string}
   */
  private FULL_URL = `http://localhost:3000/mission`;

  private API_AFTER_URL = API_Route.MISSION;
  private API_VALIDATE = API_Route.VALIDER;
  private API_REJECT = API_Route.REJETER;
  private API_RESET = API_Route.RESET;

  /**
   * Creates an instance of MissionsService.
   * @date 21/09/2022 - 11:48:21
   *
   * @constructor
   * @param {HttpClient} http
   */
  constructor(private http: HttpClient) { }



  /**
   * Description placeholder
   * @date 21/09/2022 - 11:48:21
   *
   * @returns {Observable<Mission[]>}
   */
  getMissions(): Observable<Mission[]> {
    return this.http.get<Mission[]>(`${environment.baseUrl}/${this.API_AFTER_URL}`);

  }
  /**get the mission Data with the provideed id
   *
   * @param id mission id
   * @returns a subject that you can make a subscribe on it
   */
  getMission(id: number): Observable<Mission> {
    return this.http.get<Mission>(`${environment.baseUrl}/${this.API_AFTER_URL}/${id}`);
  }
  /**
   * envoie une demande d'ajout d'une mission à l'API
   * avec les données de la mission à ajouter
   * @param mission
   * @returns
   */
  createMission(mission: Mission): Observable<Mission> {
    return this.http.post<Mission>(`${environment.baseUrl}/${this.API_AFTER_URL}`, mission);
  }
  /**
   * envoi une demande de modification de mission à l'API
   * avec les données de la mission
   * @param mission
   * @returns
   */
  updateMission(mission: Mission): Observable<Mission> {
    return this.http.put<Mission>(`${environment.baseUrl}/${this.API_AFTER_URL}/${mission.id}`, mission);
  }

  /**
   * envoie une demande de suppression de la mission à l'API
   * @param mission à surprimer
   * @returns mission suprimée
   */
  deleteMission(mission: Mission): Observable<Mission> {
    return this.http.delete<Mission>(`${environment.baseUrl}/${this.API_AFTER_URL}/${mission.id}`);
  }
  /**
   * envoi une demande de validation à l'API
   * avec les données de la mission à valider
   * @param mission
   * @returns
   */
  validateMission(mission: Mission): Observable<Mission> {
    return this.http.put<Mission>(`${environment.baseUrl}/${this.API_AFTER_URL}/${mission.id}/${this.API_VALIDATE}`, mission);
  }
  /**
   * envoie une demande de rejet de la mission à l'API
   * avec les données de la mission à rejeter
   * @param mission
   * @returns
   */
  rejectMission(mission: Mission): Observable<Mission> {
    return this.http.put<Mission>(`${environment.baseUrl}/${this.API_AFTER_URL}/${mission.id}/${this.API_REJECT}`, mission);
  }

  /**
    * envoie une demande de réinitialisation de la mission à l'API
    * avec les données de la mission à réinitialiser
    * @param mission
    * @returns
    */
  resetMission(mission: Mission): Observable<Mission> {
    return this.http.put<Mission>(`${environment.baseUrl}/${this.API_AFTER_URL}/${mission.id}/${this.API_RESET}`, mission);
  }

}
