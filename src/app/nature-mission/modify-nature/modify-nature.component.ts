import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Nature } from 'src/app/model/nature';
import { NaturesService } from 'src/app/service/natures.service';

@Component({
  selector: 'app-modify-nature',
  templateUrl: './modify-nature.component.html',
  styleUrls: ['./modify-nature.component.css']
})
export class ModifyNatureComponent implements OnInit {

  natureToUpdate: Nature = {
    id: null,
    description: '',
    dateOfValidity: new Date(),
    endOfValidity: null,
    givesBonus: false,
    charged: false,
    tjm: 0,
    bonusPercentage: 0
  };

  formGroupModifyNature: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private natureService: NaturesService
    ) {


      this.formGroupModifyNature = formBuilder.group({
        descriptionControl: ['', [Validators.required, Validators.maxLength(50)]],
        giveBonusControl: [''],
        chargedControl: [''],
        tjmControl: ['', [Validators.required, Validators.min(0)]],
        bonusControl: ['', [Validators.required, Validators.min(0)]]
      })
  }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      //get mission with id and fill the form
      this.natureService.getNature(params['id']).subscribe(
        {
          next: (data) => {
            this.natureToUpdate = data;
            /*this.formGroupModifyNature.controls["descriptionControl"].setValue(data.description);
            this.formGroupModifyNature.controls["tjmControl"].setValue(data.tjm);
            this.formGroupModifyNature.controls["bonusControl"].setValue(data.bonusPercentage);
            this.formGroupModifyNature.controls['giveBonusControl'].setValue(data.givesBonus);
            this.formGroupModifyNature.controls['chargedControl'].setValue(data.charged);*/
          }// the form is filled here
          , error: (err) => {
            console.log(err);// here is to display an error in case something went wrong
          }
        }
      )
    });

  }

  onSubmit(): void {
    if(this.formGroupModifyNature.invalid) {
      return;
    }
    /*let nature: Nature = {
      id: null,
      description: this.formGroupModifyNature.controls["descriptionControl"].value || this.natureToUpdate.description,
      dateOfValidity: this.natureToUpdate.dateOfValidity,
      endOfValidity: this.natureToUpdate.endOfValidity,
      givesBonus: this.formGroupModifyNature.controls["giveBonusControl"].value || this.natureToUpdate.givesBonus,
      charged: this.formGroupModifyNature.controls["chargedControl"].value || this.natureToUpdate.charged,
      tjm: !isNaN(this.formGroupModifyNature.controls["tjmControl"].value) ? this.formGroupModifyNature.controls["tjmControl"].value : this.natureToUpdate.tjm,
      bonusPercentage: !isNaN(this.formGroupModifyNature.controls["bonusControl"].value) ? this.formGroupModifyNature.controls["bonusControl"].value : this.natureToUpdate.bonusPercentage,
    };*/

    this.natureService.modifierNature(this.natureToUpdate.id!, this.natureToUpdate).subscribe(
      {
        next: (data) => this.router.navigate(['gestionDesNatures']),
        error: (err) => console.log(err)
      }
    );
  }

  onCancel(): void {
    this.router.navigate(['gestionDesNatures']);
  }

}
