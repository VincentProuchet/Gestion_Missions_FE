import { Component, OnInit } from '@angular/core';
import { Collaborator } from 'src/app/model/collaborator';
import { Role, RoleMap, ROLES } from 'src/app/model/role';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
/**
composant pour le menu de navigation
de l'application
 */
export class NavigationComponent implements OnInit {
  /** roles utilisateurs utilisés par authguard */
  ROLES: RoleMap = ROLES;
  /** connected user */
  user: Collaborator | null = this.auth.currentUser();

  constructor(private auth: AuthenticationService) {
    this.user = auth.currentUser();
  }

  ngOnInit(): void {
  }
  onLogout() {
    this.auth.logout();
    this.user = this.auth.currentUser();
  }

  userHasRole(role: Role): boolean {
    return this.auth.userHasRole(role);
  }

  onloginSuccess() {
    this.user = this.auth.currentUser();
  }

}
