import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Nature } from 'src/app/model/nature';
import { NaturesService } from 'src/app/service/natures.service';
import { API_FormControlNames } from 'src/environments/API_FormControlNames';

@Component({
  selector: 'app-modify-nature',
  templateUrl: './modify-nature.component.html',
  styleUrls: ['./modify-nature.component.css']
})
/**
composant de modification de Natures
 */
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
  /**
  form control names
   */
  controlName = API_FormControlNames;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private natureService: NaturesService
  ) {
  }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.natureService.getNature(params['id']).add(
        () => {
          this.nature = this.natureService.natureToModify;
          this.initFormValues(this.nature);
        }
      )
    });

  }

  onSubmit(): void {
    if (this.formGroupModifyNature.invalid) {
      return;
    }
    this.collectForm();
    this.natureService.modifierNature(this.nature.id!, this.nature);
  }

  onCancel(): void {
    this.router.navigate(['gestionDesNatures']);
  }
  /**
   * collect form data and pushes them into instance's nature
  this one is differnet on purpose
  its to chow how ugly it can be
   */
  collectForm(): void {
    this.nature.description = this.formGroupModifyNature.controls[this.controlName.descriptionControl].value;
    this.nature.dateOfValidity = new Date();
    this.nature.endOfValidity = null;
    this.nature.givesBonus = this.formGroupModifyNature.controls[this.controlName.giveBonusControl].value;
    this.nature.charged = this.formGroupModifyNature.controls[this.controlName.chargedControl].value;
    this.nature.tjm = this.formGroupModifyNature.controls[this.controlName.tjmControl].value;
    this.nature.bonusPercentage = this.formGroupModifyNature.controls[this.controlName.bonusControl].value;
  }
  /**
   * set form with original value of the nature to midify
   * @param data
   */
  initFormValues(data: Nature) {

    this.formGroupModifyNature.setValue(
      {
        descriptionControl: data.description,
        giveBonusControl: data.givesBonus,
        chargedControl: data.charged,
        tjmControl: data.tjm,
        bonusControl: data.bonusPercentage
      }
    );
  }

}

