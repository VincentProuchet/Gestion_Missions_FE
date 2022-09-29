import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Nature } from 'src/app/model/nature';
import { NaturesService } from 'src/app/service/natures.service';
import { Notify } from "notiflix";
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-modify-nature',
  templateUrl: './modify-nature.component.html',
  styleUrls: ['./modify-nature.component.css']
})
export class ModifyNatureComponent implements OnInit {
  /**
    nature to modify used by control in the form
   */
  nature: Nature = {
    id: null,
    description: '',
    dateOfValidity: new Date(),
    endOfValidity: null,
    givesBonus: false,
    charged: false,
    tjm: 0,
    bonusPercentage: 0
  };

  /** form */
  formGroupModifyNature: FormGroup = this.formBuilder.group({
    descriptionControl: [this.nature.description, [Validators.required, Validators.maxLength(50)]],
    giveBonusControl: [this.nature.givesBonus],
    chargedControl: [this.nature.charged],
    tjmControl: [this.nature.tjm, [Validators.required, Validators.min(0)]],
    bonusControl: [this.nature.bonusPercentage, [Validators.required, Validators.min(0)]]
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private natureService: NaturesService
  ) {
  }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      //get mission with id and fill the form
      this.natureService.getNature(params['id']).subscribe(
        {
          next: (data) => {
            // the form is filled here
            this.nature = data
            this.initFormValues(this.nature);
          }
          , error: (e: HttpErrorResponse) => {
            Notify.failure(e.error.message);
            console.log(e);// here is to display an error in case something went wrong
          }
        }
      )
    });

  }

  onSubmit(): void {
    if (this.formGroupModifyNature.invalid) {
      return;
    }
    this.collectForm();
    this.natureService.modifierNature(this.nature.id!, this.nature).subscribe(
      {
        next: (data) => this.router.navigate(['gestionDesNatures']),

        error: (err: HttpErrorResponse) => {
          Notify.failure(err.error.message);
          console.log(err);
        }
      }
    );
  }

  onCancel(): void {
    this.router.navigate(['gestionDesNatures']);
  }
  /**
   * collect form data and pushes them into instance's nature
   */
  collectForm(): void {
    this.nature.description = this.formGroupModifyNature.controls["descriptionControl"].value;
    this.nature.dateOfValidity = new Date();
    this.nature.endOfValidity = null;
    this.nature.givesBonus = this.formGroupModifyNature.controls["giveBonusControl"].value;
    this.nature.charged = this.formGroupModifyNature.controls["chargedControl"].value;
    this.nature.tjm = this.formGroupModifyNature.controls["tjmControl"].value;
    this.nature.bonusPercentage = this.formGroupModifyNature.controls["bonusControl"].value;

  }
  /**
   * set form with original value of the nature to midify
   * @param data
   */
  initFormValues(data: Nature) {
    this.formGroupModifyNature.setValue(
      {
        "descriptionControl": data.description,
        "giveBonusControl": data.givesBonus,
        "chargedControl": data.charged,
        "tjmControl": data.tjm,
        "bonusControl": data.bonusPercentage
      }
    );
  }

}

