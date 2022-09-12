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

}
