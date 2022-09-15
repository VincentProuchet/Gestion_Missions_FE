import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Nature } from 'src/app/model/nature';
import { NaturesService } from 'src/app/service/natures.service';

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


    this.formGroupNature.controls['giveBonusControl'].setValue(true);
    this.formGroupNature.controls['chargedControl'].setValue(true);
  }

  ngOnInit(): void { }

  onSubmit(): void {
    let nature: Nature = {
      id: null,
      description: this.formGroupNature.controls["descriptionControl"].value,
      dateOfValidity: new Date(),
      endOfValidity: null,
      givesBonus: this.formGroupNature.controls["giveBonusControl"].value || true,
      charged: this.formGroupNature.controls["chargedControl"].value || true,
      tjm: this.formGroupNature.controls["tjmControl"].value || 0,
      bonusPercentage: this.formGroupNature.controls["bonusControl"].value || 0,
    };

    this.srvNature.creationNature(nature).subscribe(
      {
        next: () => {this.router.navigate(['/gestionDesNatures'])}
        ,
        error: (err) => {
          console.log(err);
        }
      });

  }

  onCancel(): void {
    //register the new mission, if valid
    this.router.navigate(['/gestionDesNatures']);
  }


}
