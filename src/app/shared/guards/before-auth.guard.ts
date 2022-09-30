import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class BeforeAuthGuard implements CanActivate {

  constructor(private authenticationService: AuthenticationService) {

  }
  /**
    the auth guard before the auth-Guard
    for login purpose
    could also be used for parts of the app accessible to non-authenticated users.
    But I would handle that differently

   * @param route
   * @param state
   * @returns if the current user exist or not
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authenticationService.currentUser() === null;
  }

}
