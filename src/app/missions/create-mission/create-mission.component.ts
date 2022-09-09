import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-mission',
  templateUrl: './create-mission.component.html',
  styleUrls: ['./create-mission.component.css']
})
export class CreateMissionComponent implements OnInit {

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = formBuilder.group({
      startDateControl: ['', Validators.required],
      endDateControl: ['', Validators.required],
      natureControl: ['', Validators.required],
      startCityControl: ['', Validators.required],
      endCityControl: ['', Validators.required],
      transportControl: ['', Validators.required],
      bonusEstimeeControl: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log("start date control " + this.formGroup.controls["startDateControl"].value);
  }
}
