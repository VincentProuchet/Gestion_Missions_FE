import { Component, OnInit } from '@angular/core';
/*import {
  faCheck,
  faPencilAlt,
  faTimes,
  faTrashAlt,
} from '@fortawesome/free-solid-svg-icons';*/
import { Nature } from 'src/app/model/nature';
import { NaturesService } from 'src/app/service/natures.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-creation-nature',
  templateUrl: './creation-nature.component.html',
  styleUrls: ['./creation-nature.component.css'],
})
export class CreationNatureComponent implements OnInit {

  formGroupNature: FormGroup;

  /*
 //icons
  faPencilAlt = faPencilAlt
  faTrashAlt = faTrashAlt
  faCheck = faCheck
  faTimes = faTimes
  */

  constructor(
    private formBuilder: FormBuilder,
    private router: Router) {
    this.formGroupNature = formBuilder.group({


    })
  }

  ngOnInit(): void { }

  onSubmit(): void {
    this.router.navigate(['/ajouterMission']);
  }

  onCancel(): void {
    //register the new mission, if valid
    this.router.navigate(['/ajouterMission']);
  }
}
