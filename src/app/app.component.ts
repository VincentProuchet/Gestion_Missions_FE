import { Component } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faCheck, faPenToSquare, faPlus, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Gestion_Missions_FE';
  constructor(private iconLibrary: FaIconLibrary) {
    iconLibrary.addIcons(
      faCheck, //validate
      faPenToSquare, //edit
      faPlus, //add
      faTimes, //cancel
      faTrash //delete
    );
  }
}
