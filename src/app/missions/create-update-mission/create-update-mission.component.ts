import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-update-mission',
  templateUrl: './create-update-mission.component.html',
  styleUrls: ['./create-update-mission.component.css']
})
export class CreateUpdateMissionComponent implements OnInit {

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = formBuilder.group({
      startDateControl: '',
      endDateControl: '',
      natureControl: '',
      startCityControl: '',
      endCityControl: '',
      transportControl: '',
      bonusEstimeeControl: ''
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log("start date control " + this.formGroup.controls["startDateControl"].value);
  }
}
