import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Mission } from 'src/app/model/mission';
import { Nature } from 'src/app/model/nature';
import { Status } from 'src/app/model/status';
import { Transport } from 'src/app/model/transport';
import { MissionsService } from 'src/app/service/missions.service';
import { NaturesService } from 'src/app/service/natures.service';

@Component({
  selector: 'app-create-mission',
  templateUrl: './create-mission.component.html',
  styleUrls: ['./create-mission.component.css']
})
export class CreateMissionComponent implements OnInit {

  formGroup: FormGroup;
  natures: Nature[] = [];
  transportEnum: typeof Transport = Transport;

  constructor(private formBuilder: FormBuilder, private router:Router, private missionService: MissionsService, private natureService: NaturesService) {
    this.formGroup = formBuilder.group({
      startDateControl: ['', Validators.required],
      endDateControl: ['', Validators.required],
      natureControl: ['', Validators.required],
      startCityControl: ['', Validators.required],
      endCityControl: ['', Validators.required],
      transportControl: ['', Validators.required],
      bonusEstimeeControl: ['', Validators.required]
    });
    this.natureService.getNatures().subscribe(
      (data) => this.natures = data
    );
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    let newMission: Mission = {
      id: null,
      bonus: this.formGroup.controls["bonusEstimeeControl"].value,
      status: Status.INIT,
      transport: this.formGroup.controls["transportControl"].value,
      start: this.formGroup.controls["startDateControl"].value,
      end: this.formGroup.controls["endDateControl"].value,
      startCity: this.formGroup.controls["startCityControl"].value,
      arrivalCity: this.formGroup.controls["endCityControl"].value,
      nature: this.formGroup.controls["natureControl"].value,
      collaborator: null,
      expenses: []
    }
    this.missionService.createMission(newMission).subscribe({
      next: (data) => {
        this.router.navigate(['gestionMission']);
      },
      error: (err) => console.log(err)
    });
  }
  onCancel(): void {
    //register the new mission, if valid
    this.router.navigate(['gestionMission'])
  }
}
