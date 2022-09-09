import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Mission } from '../model/mission';

@Injectable({
  providedIn: 'root'
})
export class MissionsService {

  private API_AFTER_URL: string = "/mission";
  private missions = new Subject<Mission[]>();

  constructor(private http: HttpClient) { }

  getMissions(): Subject<Mission[]> {
    this.http.get<Mission[]>(environment.baseUrl + environment.port + this.API_AFTER_URL)
      .subscribe(
        {
          next: (data: Mission[]) => {
            this.missions.next(data)
            console.log(data);
          }
          ,
          error: (err: any) => { console.log(err) }
        }
      )
    return this.missions;
  }
}
