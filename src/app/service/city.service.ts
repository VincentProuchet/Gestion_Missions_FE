import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_Route } from 'src/environments/API_route';
import { AP_Vars } from 'src/environments/API_Vars';
import { City } from '../model/city';

/**
 * Description placeholder
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

  private cities: City[];
  private API_AFTER_URL: string = API_Route.CITY;
  /**
   * Creates an instance of CityService.
   * @date 21/09/2022 - 12:12:22
   *
   * @constructor
   */
  constructor(private http: HttpClient) {
    this.cities = new Array<City>();

  }
  /**
   * fetch data from Backend
  *return obervables
   * @returns
   */
  getCities(): Observable<City[]> {
    return this.http.get<City[]>(`${AP_Vars.BEConnectionUrl}/${this.API_AFTER_URL}`);
  }



}
