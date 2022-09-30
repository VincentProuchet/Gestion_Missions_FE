import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Role } from 'src/app/model/role';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private router: Router, private authenticationService: AuthenticationService) {

  }

  /**
    * controle if a user as the rigth to access an element
  this is NOT A SECURITY just an aid to create a better UI/UX
    * @param route
    * @param state
    * @returns the current user  role
     */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return route.data['roles'].some((role: Role) => this.authenticationService.userHasRole(role));
  }

}
