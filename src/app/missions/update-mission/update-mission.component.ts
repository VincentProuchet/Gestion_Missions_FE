import { formatDate, getLocaleId } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-mission',
  templateUrl: './update-mission.component.html',
  styleUrls: ['./update-mission.component.css']
})
export class UpdateMissionComponent implements OnInit {

  formGroup: FormGroup;
  mission:any;

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
    //fake values to test display
    this.mission = {
      startDate: formatDate(new Date(), 'yyyy-MM-dd', 'en'), // retrieve the locale of the user
      endDate: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
      nature: "",
      startCity: "test",
      endCity: "test",
      transport: "",
      bonusEstimee: "test"
    }
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log("start date control " + this.formGroup.controls["startDateControl"].value);
  }
}
