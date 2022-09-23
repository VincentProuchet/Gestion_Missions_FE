import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from "ngx-cookie-service";


import { map, Observable } from 'rxjs';
import { API_Route } from 'src/environments/API_route';
import { AP_Vars } from 'src/environments/API_Vars';

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

  constructor(private router: Router, private collaboratorService: CollaboratorService, private http: HttpClient
    , private srvCookies: CookieService
  ) {

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
   * tih method is the one to post formdata to backend
   * @param loginCred
   * @returns
   */
  loginfromdb(loginCred: LoginCredentials): Observable<Object> {
    console.log("login from db");
    let loginformParam = new FormData();
    loginformParam.append('username', loginCred.username);
    loginformParam.append('password', loginCred.password);



    return this.http.post(`${AP_Vars.BEConnectionUrl}/${API_Route.SIGNIN}`, loginformParam);

  }

  logout(): void {
    if (this.currentUser()) {
      this.http.get(`${AP_Vars.BEConnectionUrl}/${API_Route.LOGOUT}`).subscribe({
        next: () => { },
        error: (err) => console.log(err)
      });
      this.srvCookies.deleteAll();
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
