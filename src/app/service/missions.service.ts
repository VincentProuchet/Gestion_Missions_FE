import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Mission } from '../model/mission';

@Injectable({
  providedIn: 'root'
})
export class MissionsService {

  private API_AFTER_URL: string = "/mission";
  private API_URL_VALIDATE: string = '/valider';
  private API_URL_REJETER: string = '/rejeter';

  constructor(private http: HttpClient) { }



  getMissions(): Observable<Mission[]> {
    return this.http.get<Mission[]>(environment.baseUrl + environment.port + this.API_AFTER_URL);

  }
  /**get the mission Data with the provideed id
   *
   * @param id mission id
   * @returns a subject that you can make a subscribe on it
   */
  getMission(id: number): Observable<Mission> {
    return this.http.get<Mission>(`${environment.baseUrl}${environment.port}${this.API_AFTER_URL}/${id}`);
  }
  /**
   * envoie une demande d'ajout d'une mission à l'API
   * avec les données de la mission à ajouter
   * @param mission
   * @returns
   */
  createMission(mission: Mission): Observable<Mission> {
    return this.http.post<Mission>(`${environment.baseUrl}${environment.port}${this.API_AFTER_URL}`, mission);
  }
  /**
   * envoi une demande de modification de mission à l'API
   * avec les données de la mission
   * @param mission
   * @returns
   */
  updateMission(mission: Mission): Observable<Mission> {
    return this.http.put<Mission>(`${environment.baseUrl}${environment.port}${this.API_AFTER_URL}/${mission.id}`, mission);
  }

  /**
   * envoie une demande de suppression de la mission à l'API
   * @param mission à surprimer
   * @returns mission suprimée
   */
  deleteMission(mission: Mission): Observable<Mission> {
    return this.http.delete<Mission>(`${environment.baseUrl}${environment.port}${this.API_AFTER_URL}/${mission.id}`);
  }
  /**
   * envoi une demande de validation à l'API
   * avec les données de la mission à valider
   * @param mission
   * @returns
   */
  validateMission(mission: Mission): Observable<Mission> {
    return this.http.put<Mission>(`${environment.baseUrl}${environment.port}${this.API_AFTER_URL}/${mission.id}/${this.API_URL_VALIDATE}`, mission);
  }
  /**
   * envoie une demande de rejet de la mission à l'API
   * avec les données de la mission à valider
   * @param mission
   * @returns
   */
  rejectMission(mission: Mission): Observable<Mission> {
    return this.http.put<Mission>(`${environment.baseUrl}${environment.port}${this.API_AFTER_URL}/${mission.id}/${this.API_URL_REJETER}`, mission);
  }

}
