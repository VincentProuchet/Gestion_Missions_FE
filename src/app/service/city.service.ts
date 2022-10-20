import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as Notiflix from 'notiflix';
import { Observable, Subscription } from 'rxjs';
import { API_Route } from 'src/environments/API_route';
import { AP_Vars } from 'src/environments/API_Vars';
import { City } from '../model/city';

/**
 * Service pour les villes
 * @date 21/09/2022 - 12:12:22
 *
 * @export
 * @class CityService
 * @typedef {CityService}
 */
@Injectable({
  providedIn: 'root'
})
export class CityService {
  /**
   list of cities
   public because its where component get data
    */
  public cities: City[] = [];
  private API_AFTER_URL: string = API_Route.CITY;
  /**
   * Creates an instance of CityService.
   * @date 21/09/2022 - 12:12:22
   *
   * @constructor
   */
  constructor(private http: HttpClient) {

  }
  /**
   * fetch data from Backend
  *return obervables
   * @returns
   */
  getCities(): Subscription {
    return this.http.get<City[]>(`${AP_Vars.BEConnectionUrl}/${this.API_AFTER_URL}`).subscribe(
      {
        next: (data: City[]) => { this.cities = data },
        error: (err: HttpErrorResponse) => { Notiflix.Notify.failure(err.error.message); }
      }
    );
  }




}
