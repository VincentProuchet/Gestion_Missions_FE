import { Component, OnInit } from '@angular/core';
import { faCheck, faPencilAlt, faTimes, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { NaturesService } from 'src/app/service/natures.service';


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


  constructor(private srvNature: NaturesService) { }

  ngOnInit(): void {
  }


}
