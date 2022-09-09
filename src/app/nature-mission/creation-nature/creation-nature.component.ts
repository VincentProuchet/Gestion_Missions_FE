import { Component, OnInit } from '@angular/core';
import { faPencilAlt, faTrashAlt, faTimes, faCheck, faPlusCircle } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-creation-nature',
  templateUrl: './creation-nature.component.html',
  styleUrls: ['./creation-nature.component.css']
})
export class CreationNatureComponent implements OnInit {

  //icons
  faPencilAlt = faPencilAlt
  faTrashAlt = faTrashAlt
  faCheck = faCheck
  faTimes = faTimes



  constructor() { }

  ngOnInit(): void {
  }

}