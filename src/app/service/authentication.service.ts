import { HttpClient, HttpClientModule, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { API_Route } from 'src/environments/API_route';
import { environment } from 'src/environments/environment';
import { Collaborator } from '../model/collaborator';
import { LoginCredentials } from '../model/login-credentials';
import { Role } from '../model/role';
import { CollaboratorService } from './collaborator.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  //TODO: temporary global password
  private PW: string = "pass";

  private STORAGE_KEY: string = "user";

  constructor(private router: Router, private collaboratorService: CollaboratorService, private http: HttpClient) {

  }

  //TODO: Refactoriser une fois connecté au back-end;
  login(loginCred: LoginCredentials): Observable<boolean> {
    let collaborator: Collaborator | null;
    return this.collaboratorService.getCollaboratorByUsername(loginCred.username).pipe(map(
      (data) => {
        collaborator = data;
        if (collaborator !== null && loginCred.password === this.PW) {
          localStorage.setItem(this.STORAGE_KEY, JSON.stringify(collaborator));
          return true;
        }
        return false;
      }
    ));
  }
  /**
   *
   * @param loginCred
   * @returns
   */
  loginfromdb(loginCred: LoginCredentials): Observable<Object> {
    console.log("sending");
    let urlSearchParams = new FormData();
    urlSearchParams.append('username', loginCred.username);
    urlSearchParams.append('password', loginCred.password);
    return this.http.head(`${environment.baseUrl}/${API_Route.SIGNIN}`,
      //return this.http.head(`api/${API_Route.SIGNIN}`,

      // {
      //   "Authorization": "Basic bWFyaW86MTExMQ=="
        /*"Basic " + btoa(
          unescape(
            encodeURIComponent("mario" + ':' + "1111")
          )
        )*/
      // }
      {
        headers: {
          "Authorization": "Basic bWFyaW86MTExMQ==",
          //urlSearchParams,
          'Access-Control-Allow-Origin': environment.baseUrl,
          //'username': loginCred.username,
          //'password': loginCred.password
        },
        params: {

        },
        observe: "events",
        responseType: "json",
        withCredentials: true
      }
    );

  }

  logout(): void {
    if (this.currentUser()) {
      localStorage.removeItem(this.STORAGE_KEY);
      window.location.reload();
    }
  }

  currentUser(): Collaborator | null {
    let user: string | null = localStorage.getItem(this.STORAGE_KEY);
    return user ? JSON.parse(user) : null;
  }

  userHasRole(role: Role): boolean {
    let user: Collaborator | null = this.currentUser();
    return user ? user.roles.some((r) => r.label === role.label) : false;
  }

}
