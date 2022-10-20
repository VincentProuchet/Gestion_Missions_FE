import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as Notiflix from 'notiflix';
import { City } from 'src/app/model/city';
import { Mission } from 'src/app/model/mission';
import { Nature } from 'src/app/model/nature';
import { Status } from 'src/app/model/status';
import { Transport } from 'src/app/model/transport';
import { CityService } from 'src/app/service/city.service';
import { MissionsService } from 'src/app/service/missions.service';
import { NaturesService } from 'src/app/service/natures.service';
import { TransportService } from 'src/app/service/transport.service';
import { CustomValidators } from 'src/app/model/custom-validators';

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
  }, { validators: [CustomValidators.startEndDateValidator()] });
  /**
  nom des control dans le formulaire du composant
   */
  controlNames = {
    startDateControl: "startDateControl"
    , endDateControl: "endDateControl"
    , natureControl: "natureControl"
    , startCityControl: "startCityControl"
    , endCityControl: "endCityControl"
    , transportControl: "transportControl"
    , bonusEstimeeControl: "bonusEstimeeControl"
  }
  /** liste des nature */
  natures: Nature[] = [];
  /** liste des villes */
  cities: City[] = [];
  /** enumération des transports */
  transports: Record<keyof typeof Transport, Transport>;


  constructor(private formBuilder: FormBuilder, private router: Router, private missionService: MissionsService, private natureService: NaturesService, private transportService: TransportService
    , private srvCity: CityService
  ) {
    this.transports = transportService.getTransportMap();
    this.natureService.getNatures().add(() => { this.natures = this.natureService.getValidNatures(this.natureService.natures) });
    this.srvCity.getCities().add(() => this.cities = srvCity.cities);
  }

  ngOnInit(): void {
  }
  /**
   * controle la validité du formulaire
      puis fait une demande d'enregistrement en persistence
      avant d'envoyer l'utilisateur vers la page de gestion des missions
   */
  onSubmit(): void {
    if (!this.formGroup.invalid) {
      this.missionService.createMission(this.collectForm());
    }
  }
  /**
   * annulation de la création
  retourne à la page gestionDesMission
   */
  onCancel(): void {
    //register the new mission, if valid
    this.router.navigate(['gestionMission'])
  }
  /**
   * collecte les données du formulaire

   * @returns a convenient Mission entity filled with data from the form
   */
  collectForm(): Mission {
    return {
      id: null,
      bonus: this.formGroup.controls[this.controlNames.bonusEstimeeControl].value,
      status: Status.INIT,
      transport: this.formGroup.controls[this.controlNames.transportControl].value,
      start: new Date(this.formGroup.controls[this.controlNames.startDateControl].value),
      end: new Date(this.formGroup.controls[this.controlNames.endDateControl].value),
      nature: this.formGroup.controls[this.controlNames.natureControl].value,
      startCity: this.formGroup.controls[this.controlNames.startCityControl].value,
      arrivalCity: this.formGroup.controls[this.controlNames.endCityControl].value,
      collaborator: null,
      expenses: []
    }
  }
}
