import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { City } from 'src/app/model/city';
import { Mission } from 'src/app/model/mission';
import { Nature } from 'src/app/model/nature';
import { Status } from 'src/app/model/status';
import { Transport } from 'src/app/model/transport';
import { CityService } from 'src/app/service/city.service';
import { MissionsService } from 'src/app/service/missions.service';
import { NaturesService } from 'src/app/service/natures.service';
import { TransportService } from 'src/app/service/transport.service';
import { CustomValidators } from 'src/app/shared/custom-validators';

@Component({
  selector: 'app-create-mission',
  templateUrl: './create-mission.component.html',
  styleUrls: ['./create-mission.component.css']
})
export class CreateMissionComponent implements OnInit {

  /** the form */
  formGroup: FormGroup = this.formBuilder.group({
    startDateControl: ['', [Validators.required]],
    endDateControl: ['', [Validators.required]],
    natureControl: ['', [Validators.required]],
    startCityControl: ['', [Validators.required, Validators.maxLength(50)]],
    endCityControl: ['', [Validators.required, Validators.maxLength(50)]],
    transportControl: ['', [Validators.required]],
    bonusEstimeeControl: ['']
  }, { validators: [CustomValidators.startEndDateValidator()] });;

  natures: Nature[] = [];
  cities: City[] = [];
  transports: Record<keyof typeof Transport, Transport>;


  constructor(private formBuilder: FormBuilder, private router: Router, private missionService: MissionsService, private natureService: NaturesService, private transportService: TransportService
    , private srvCity: CityService
  ) {
    this.transports = transportService.getTransportMap();
    this.natureService.getNatures().subscribe(
      (data) => this.natures = this.natureService.getValidNatures(data)
    );
    this.srvCity.getCities().subscribe(
      (data) => this.cities = data
    );
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      return;
    }
    let selectedStart;
    let selectedArrival;


    let newMission: Mission = {
      id: null,
      bonus: this.formGroup.controls["bonusEstimeeControl"].value,
      status: Status.INIT,
      transport: this.formGroup.controls["transportControl"].value,
      start: new Date(this.formGroup.controls["startDateControl"].value),
      end: new Date(this.formGroup.controls["endDateControl"].value),
      nature: this.formGroup.controls["natureControl"].value,
      startCity: this.formGroup.controls["startCityControl"].value,
      arrivalCity: this.formGroup.controls["endCityControl"].value,
      collaborator: null,
      expenses: []
    }
    console.log(newMission);

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
