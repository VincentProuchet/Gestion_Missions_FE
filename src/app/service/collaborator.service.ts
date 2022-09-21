import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Collaborator } from '../model/collaborator';

/**
 * Description placeholder
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

  private API_AFTER_URL: Readonly<string> = "Collaborateur";

  /**
   * Creates an instance of CollaboratorService.
   * @date 21/09/2022 - 12:12:32
   *
   * @constructor
   */
  constructor(private http: HttpClient) { }

  private FULL_URL_EXPENSES: Readonly<string> = `http://localhost:3000/Collaborateur`;

  getCollaborators(): Observable<Collaborator[]> {
    return this.http.get<Collaborator[]>(`${environment.baseUrl}/${this.API_AFTER_URL}`);
  }

  //TODO: Refactoriser une fois connecté au back-end;
  getCollaboratorByEmail(email: string): Collaborator | null {
    let collaborators: Collaborator[] = [];
    this.getCollaborators().subscribe({
      next: (data) => {
        collaborators = data;
      },
      error: (err) => console.log(err)
    });
    let collaborator = collaborators.filter((c) => c.email === email);
    return collaborator.length ? collaborator[0] : null;
  }

}
