import { HttpClient, HttpClientModule } from '@angular/common/http';
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
  loginfromdb(loginCred: LoginCredentials): Observable<Object> {
    console.log("sending");
    this.http.options.arguments;
    this.http.options.bind(loginCred);
    return this.http.head(`${environment.baseUrl}/${API_Route.SIGNIN}`);
  }

  logout(): void {
    if (this.currentUser()) {
      localStorage.removeItem(this.STORAGE_KEY);
      console.log("hello, hi");
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
