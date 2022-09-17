import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Nature } from 'src/app/model/nature';
import { NaturesService } from 'src/app/service/natures.service';
import { CustomValidators } from 'src/app/shared/custom-validators';

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
      descriptionControl: ['', [Validators.required, Validators.maxLength(30)]],
      giveBonusControl: [true],
      chargedControl: [true],
      tjmControl: [0, [Validators.required, Validators.min(0)]],
      bonusControl: [0, [Validators.required, Validators.min(0)]]
    });


    }

  ngOnInit(): void { }

  onSubmit(): void {
    if (this.formGroupNature.invalid) {
      return;
    }
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
