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
/**
  service responsible for storing user upon login in
  and removing user on login out
  it's the one interrogated for user UI access
  IT's NOT a SECURITY provider, jsuter an helper on UX
*/
export class AuthenticationService {

  private connectedUser: Collaborator | null = null;
  private STORAGE_KEY: string = AP_Vars.CookiesNameUser;

  constructor(private router: Router, private srvCollaborator: CollaboratorService, private http: HttpClient
    , private srvCookies: CookieService
  ) {
    // we look in local storage for a cookies of a user
    this.connectedUser = this.currentUser();
  }

  /**
   * this method make a resquest to a BE
    it post formdata to backend login page
   * @param loginCred
   * @returns
   */
  loginfromdb(loginCred: LoginCredentials): Observable<Collaborator> {
    console.log("login from db");
    let loginformParam = new FormData();
    loginformParam.append('username', loginCred.username);
    loginformParam.append('password', loginCred.password);

    return this.http.post<Collaborator>(`${AP_Vars.BEConnectionUrl}/${API_Route.SIGNIN}`, loginformParam);
  }
  /**
   * make the resquest for login out
  and do a refresh of the windows for the guard to do the magic
   */
  logout(): void {
    if (this.currentUser()) {
      this.http.post(`${AP_Vars.BEConnectionUrl}/${API_Route.LOGOUT}`, null).subscribe({
        next: (data) => {
          this.deleteUser();
          window.location.reload();
          Notiflix.Notify.success("logged out");
        },
        error: (e: HttpErrorResponse) => {
          Notiflix.Notify.failure(e.error);
          console.log(e.error)
        }
      });

    } else {
      Notiflix.Notify.failure("No current user");
    }
  }
  /**
   * puts user data in local storage
  and in connectedUser propertie
   * @param user
   */
  setUser(user: Collaborator): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user, null, 1));
    this.connectedUser = user;
    // sessionStorage.setItem("pourquoi ça marche pas ?", "parce que t'écrit au mauvais endroit ANDOUILLE !");
  }
  /**
   * will delete user cookies
in session and local storage
  and destroy the connectedUser
   */
  deleteUser(): void {
    this.srvCookies.delete(AP_Vars.CookiesNameSession);
    localStorage.removeItem(this.STORAGE_KEY);
    this.connectedUser = null;

  }
  /**
   * will look in local storage for a Collaborator type cookie
   * @returns nul if the current user doesn't exist
   */
  currentUser(): Collaborator | null {
    let user: string | null = localStorage.getItem(this.STORAGE_KEY);
    return user ? JSON.parse(user) : null;
  }

  /**
   * will give out roles of the user in localStorage
   * @param role
   * @returns
   */
  userHasRole(role: Role): boolean {
    let user: Collaborator | null = this.currentUser();
    return user ? user.roles.some((r) => r.label === role.label) : false;
  }

}
