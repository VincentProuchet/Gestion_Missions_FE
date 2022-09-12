import { Component, OnInit } from '@angular/core';
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
    private router: Router, private srvNature: NaturesService
  ) {
    this.formGroupNature = formBuilder.group({
      descriptionControl: [''],
      giveBonusControl: [''],
      chargedControl: [''],
      tjmControl: [''],
      bonusControl: ['']
    })
  }

  ngOnInit(): void { }

  onSubmit(): void {
    let nature: Nature = {
      id: null,
      description: this.formGroupNature.controls["descriptionControl"].value,
      dateOfValidity: new Date(Date.now()),
      endOfValidity: null,
      givesBonus: this.formGroupNature.controls["giveBonusControl"].value,
      charged: this.formGroupNature.controls["chargedControl"].value,
      tjm: this.formGroupNature.controls["tjmControl"].value,
      bonusPercentage: this.formGroupNature.controls["bonusControl"].value,
    };

    this.srvNature.creationNature(nature).subscribe(
      {
        next: () => { }
        ,
        error: (err) => {
          console.log(err);
        }
      });
    this.router.navigate(['/ajouterMission']);
  }

  onCancel(): void {
    //register the new mission, if valid
    this.router.navigate(['modifierNature']);
  }

}
