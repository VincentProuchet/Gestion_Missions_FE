import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Nature } from 'src/app/model/nature';
import { NaturesService } from 'src/app/service/natures.service';

@Component({
  selector: 'app-modify-nature',
  templateUrl: './modify-nature.component.html',
  styleUrls: ['./modify-nature.component.css']
})
export class ModifyNatureComponent implements OnInit {

  @Input() natureToUpdate!: Nature;

  formGroupModifyNature: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private natureService: NaturesService
    ) {


      this.formGroupModifyNature = formBuilder.group({
        descriptionControl: [''],
        giveBonusControl: [''],
        chargedControl: [''],
        tjmControl: [''],
        bonusControl: ['']
      })


      this.formGroupModifyNature.controls['giveBonusControl'].setValue(true);
      this.formGroupModifyNature.controls['chargedControl'].setValue(true);
  }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      //get mission with id and fill the form
      this.natureService.getNature(params['id']).subscribe(
        {
          next: (data) => {
            this.natureToUpdate = data;
            this.formGroupModifyNature.controls["descriptionControl"].setValue(data.description);
            this.formGroupModifyNature.controls["tjmControl"].setValue(data.tjm);
            this.formGroupModifyNature.controls["bonusControl"].setValue(data.bonusPercentage);
            this.formGroupModifyNature.controls['giveBonusControl'].setValue(data.givesBonus);
            this.formGroupModifyNature.controls['chargedControl'].setValue(data.charged);
          }// the form is filled here
          , error: (err) => {
            console.log(err);// here is to display an error in case something went wrong
          }
        }
      )
    });

  }

  onSubmit(): void {
    let nature: Nature = {
      id: null,
      description: this.formGroupModifyNature.controls["descriptionControl"].value || this.natureToUpdate.description,
      dateOfValidity: this.natureToUpdate.dateOfValidity,
      endOfValidity: this.natureToUpdate.endOfValidity,
      givesBonus: this.formGroupModifyNature.controls["giveBonusControl"].value || this.natureToUpdate.givesBonus,
      charged: this.formGroupModifyNature.controls["chargedControl"].value || this.natureToUpdate.charged,
      tjm: !isNaN(this.formGroupModifyNature.controls["tjmControl"].value) ? this.formGroupModifyNature.controls["tjmControl"].value : this.natureToUpdate.tjm,
      bonusPercentage: !isNaN(this.formGroupModifyNature.controls["bonusControl"].value) ? this.formGroupModifyNature.controls["bonusControl"].value : this.natureToUpdate.bonusPercentage,
    };

    this.natureService.modifierNature(this.natureToUpdate.id!, nature).subscribe(
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
