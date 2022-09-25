import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AP_Vars } from 'src/environments/API_Vars';
import { environment } from 'src/environments/environment';
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

  /**
   * Creates an instance of CollaboratorService.
   * @date 21/09/2022 - 12:12:32
   *
   * @constructor
   */
  constructor(private http: HttpClient) { }

  /**
   * is supporsed to give you the user connected to the server
  by asking the back-end data for its curently connected user
   * @returns Observable<Collaborator>
   */
  getConnectedUser(): Observable<Collaborator> {
    console.log("getting connected user");

    // let header = new HttpHeaders();
    // header.append("Access-Control-Allow-Origin", environment.baseUrl);

    return this.http.get<Collaborator>(`${AP_Vars.BEConnectionUrl}/${this.API_AFTER_URL}`

      //, {
      //   headers: header,
      // }
    );
  }
  getCollaborators(): Observable<Collaborator[]> {
    return this.http.get<Collaborator[]>(`${AP_Vars.BEConnectionUrl}/${this.API_AFTER_URL}`);
  }

  //TODO: Refactoriser une fois connecté au back-end;
  getCollaboratorByUsername(username: string): Observable<Collaborator | null> {
    console.log(`${AP_Vars.BEConnectionUrl}/login`);
    return this.http.head<Collaborator>(`${AP_Vars.BEConnectionUrl}/login`);
    /*
    return this.getCollaborators().pipe(map(
      (data) => {
        collaborators = data;
        let collaborator = collaborators.filter((c) => c.username === username);
        return collaborator.length ? collaborator[0] : null;
      }
    ));*/
  }
}
