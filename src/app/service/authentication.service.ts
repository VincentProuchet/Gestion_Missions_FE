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
    this.setNotiflix();
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
    this.http.post(`${AP_Vars.BEConnectionUrl}/${API_Route.LOGOUT}`, null).subscribe({
      next: (data) => {
        Notiflix.Notify.success("logged out");
      },
      error: (e: HttpErrorResponse) => {
        this.deleteUser();
        Notiflix.Notify.failure(e.error.message);
        window.location.reload();
      },
      complete: () => {
        this.deleteUser();
        window.location.reload();

      }
    });
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
    sessionStorage.removeItem(AP_Vars.CookiesNameSession);
    localStorage.removeItem(this.STORAGE_KEY);
    this.connectedUser = null;

  }
  /**
   * will look in local storage for a Collaborator type cookie
   * @returns nul if the current user doesn't exist
   */
  currentUser(): Collaborator | null {
    let user: string | null = localStorage.getItem(this.STORAGE_KEY);
    this.connectedUser = user ? JSON.parse(user) : null;
    return this.connectedUser;
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
  setNotiflix(): void {
    Notiflix.Notify.init(
      {
        width: '280px'
        , ID: 'NotiflixNotify'
        , className: 'notiflix-notify'
        , fontFamily: 'Quicksand'
        , position: 'center-bottom'
        , fontSize: '13px'
        , distance: '10px'
        , borderRadius: '5px'
        , fontAwesomeIconStyle: 'basic'
        , fontAwesomeIconSize: '34px'
        , cssAnimation: true
        , plainText: true
        , backOverlayColor: 'rgba(0,0,0,0.5)'
        , cssAnimationStyle: 'from-left'
        , cssAnimationDuration: 400
        , closeButton: true
        , useIcon: true
        , useFontAwesome: false
        , opacity: 1
        , rtl: false
        , backOverlay: false
        , showOnlyTheLastOne: true
        , clickToClose: true
        , pauseOnHover: false
        , zindex: 4001
        , timeout: 10
        , messageMaxLength: 110
        ,

        success: {
          background: '#32c682', textColor: '#fff', childClassName: 'notiflix-notify-success',
          notiflixIconColor: 'rgba(0,0,0,0.2)', fontAwesomeClassName: 'fas fa-check-circle',
          fontAwesomeIconColor: 'rgba(0,0,0,0.2)', backOverlayColor: 'rgba(50,198,130,0.2)',
        }

        , failure: {
          background: '#ff5549', textColor: '#fff', childClassName: 'notiflix-notify-failure',
          notiflixIconColor: 'rgba(0,0,0,0.2)', fontAwesomeClassName: 'fas fa-times-circle',
          fontAwesomeIconColor: 'rgba(0,0,0,0.2)', backOverlayColor: 'rgba(255,85,73,0.2)',
        },
        warning: {
          background: '#eebf31', textColor: '#fff', childClassName: 'notiflix-notify-warning',
          notiflixIconColor: 'rgba(0,0,0,0.2)', fontAwesomeClassName: 'fas fa-exclamation-circle',
          fontAwesomeIconColor: 'rgba(0,0,0,0.2)', backOverlayColor: 'rgba(238,191,49,0.2)',
        },
        info: {
          background: '#26c0d3', textColor: '#fff', childClassName: 'notiflix-notify-info',
          notiflixIconColor: 'rgba(0,0,0,0.2)', fontAwesomeClassName: 'fas fa-info-circle',
          fontAwesomeIconColor: 'rgba(0,0,0,0.2)', backOverlayColor: 'rgba(38,192,211,0.2)',
        },
      }
    );
    Notiflix.Report.init(
      {
        className: 'notiflix-report', width: '320px', backgroundColor: '#f8f8f8', borderRadius: '25px'
        , rtl: false, zindex: 4002, backOverlay: true, backOverlayColor: 'rgba(0,0,0,0.5)'
        , backOverlayClickToClose: false, fontFamily: 'Quicksand', svgSize: '110px', plainText: true, titleFontSize: '16px'
        , titleMaxLength: 34, messageFontSize: '13px', messageMaxLength: 400, buttonFontSize: '14px', buttonMaxLength: 34
        , cssAnimation: true, cssAnimationDuration: 360, cssAnimationStyle: 'fade'
        , success: {
          svgColor: '#32c682', titleColor: '#1e1e1e', messageColor: '#242424'
          , buttonBackground: '#32c682', buttonColor: '#fff', backOverlayColor: 'rgba(50,198,130,0.2)',
        }
        , failure: {
          svgColor: '#ff5549', titleColor: '#1e1e1e', messageColor: '#242424'
          , buttonBackground: '#ff5549', buttonColor: '#fff', backOverlayColor: 'rgba(255,85,73,0.2)',
        }
        , warning: {
          svgColor: '#eebf31', titleColor: '#1e1e1e', messageColor: '#242424'
          , buttonBackground: '#eebf31', buttonColor: '#fff', backOverlayColor: 'rgba(238,191,49,0.2)',
        }
        , info: {
          svgColor: '#26c0d3', titleColor: '#1e1e1e', messageColor: '#242424'
          , buttonBackground: '#26c0d3', buttonColor: '#fff', backOverlayColor: 'rgba(38,192,211,0.2)',
        }
      }
    );
    Notiflix.Confirm.init(
      {
        className: 'notiflix-confirm'
        , width: '300px', zindex: 4003, position: 'center'
        , distance: '10px'
        , backgroundColor: '#f8f8f8', borderRadius: '25px'
        , backOverlay: true, backOverlayColor: 'rgba(0,0,0,0.5)'
        , rtl: false, fontFamily: 'Quicksand', cssAnimation: true, cssAnimationDuration: 300, cssAnimationStyle: 'fade'
        , plainText: true, titleColor: '#32c682', titleFontSize: '16px', titleMaxLength: 34, messageColor: '#1e1e1e'
        , messageFontSize: '14px', messageMaxLength: 110, buttonsFontSize: '15px', buttonsMaxLength: 34, okButtonColor: '#f8f8f8'
        , okButtonBackground: '#32c682', cancelButtonColor: '#f8f8f8', cancelButtonBackground: '#a9a9a9',
      }
    );
    Notiflix.Loading.init(
      {
        className: 'notiflix-loading'
        , zindex: 4000
        , backgroundColor: 'rgba(0,0,0,0.8)'
        , rtl: false, fontFamily: 'Quicksand'
        , cssAnimation: true
        , cssAnimationDuration: 400
        , clickToClose: false
        , customSvgUrl: null
        , customSvgCode: null
        , svgSize: '80px'
        , svgColor: '#32c682'
        , messageID: 'NotiflixLoadingMessage'
        , messageFontSize: '15px'
        , messageMaxLength: 34
        , messageColor: '#dcdcdc',
      }
    );
    Notiflix.Block.init(
      {
        querySelectorLimit: 200
        , className: 'notiflix-block'
        , position: 'absolute'
        , zindex: 1000
        , backgroundColor: 'rgba(255,255,255,0.9)'
        , rtl: false, fontFamily: 'Quicksand'
        , cssAnimation: true
        , cssAnimationDuration: 300
        , svgSize: '45px'
        , svgColor: '#383838'
        , messageFontSize: '14px'
        , messageMaxLength: 34
        , messageColor: '#383838',
      }
    );

  }

}
