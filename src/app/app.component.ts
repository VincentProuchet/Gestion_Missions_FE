import { Component } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faCheck, faPenToSquare, faPlus, faRightFromBracket, faRotateLeft, faTimes, faTrash, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Collaborator } from './model/collaborator';
import { AuthenticationService } from './service/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user: Collaborator | null = this.authenticationService.currentUser();
  title = 'Gestion_Missions_FE';
  constructor(private iconLibrary: FaIconLibrary, private authenticationService: AuthenticationService) {
    iconLibrary.addIcons(
      faCheck, //validate
      faPenToSquare, //edit
      faPlus, //add
      faRotateLeft, //reload
      faRightFromBracket, //logout
      faTimes, //cancel
      faTrash, //delete
      faUserCircle //user
    );
  }

  onLogout() {
    this.authenticationService.logout();
  }

}
