import { JsonPipe } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from "ngx-cookie-service";
import * as Notiflix from 'notiflix';


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

  private connectedUser!: Collaborator;
  //TODO: temporary global password
  private PW: string = "pass";

  private STORAGE_KEY: string = AP_Vars.CookiesNameUser;

  constructor(private router: Router, private collaboratorService: CollaboratorService, private http: HttpClient
    , private srvCookies: CookieService
  ) {

  }

  /**
   * this method make a resquest to a BE
    it post formdata to backend login page
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
    console.log("auth service logout ");
    console.log(this.currentUser());

    if (this.currentUser()) {
      this.http.post(`${AP_Vars.BEConnectionUrl}/${API_Route.LOGOUT}`, null).subscribe({
        next: (data) => {
          console.log('server responded yes');
          console.log(data);
          this.srvCookies.delete(AP_Vars.CookiesNameSession);
          localStorage.removeItem(this.STORAGE_KEY);
          console.log("cookies deleted");
          //window.location.reload();
        },
        error: (e: HttpErrorResponse) => {
          console.log('server responded no');
          console.log(e.error)
        },
        complete: () => {
          console.log("fuck you");

        }

      });

    } else {
      Notiflix.Notify.failure("No current user");
    }
  }
  setUser(user: Collaborator): void {
    console.log(user);
    console.log(JSON.stringify(user, null, 1));
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user, null, 1));
    sessionStorage.setItem("pourquoi ça marche pas ?", "parce que t'écrit au mauvais endroit ANDOUILLE !");
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
