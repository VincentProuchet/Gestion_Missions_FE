import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { City } from 'src/app/model/city';
import { ToolBox } from 'src/app/model/ToolBox';
import { Mission } from 'src/app/model/mission';
import { Nature } from 'src/app/model/nature';
import { Transport } from 'src/app/model/transport';
import { CityService } from 'src/app/service/city.service';
import { MissionsService } from 'src/app/service/missions.service';
import { NaturesService } from 'src/app/service/natures.service';
import { TransportService } from 'src/app/service/transport.service';
import { CustomValidators } from 'src/app/shared/custom-validators';
import { AP_Vars } from 'src/environments/API_Vars';

@Component({
  selector: 'app-update-mission',
  templateUrl: './update-mission.component.html',
  styleUrls: ['./update-mission.component.css']
})
export class UpdateMissionComponent implements OnInit {
  /** formular */
  formGroup: FormGroup = this.formBuilder.group(
    {
      startDateControl: ['', [Validators.required]],
      endDateControl: ['', [Validators.required]],
      natureControl: ['', [Validators.required]],
      startCityControl: ['', [Validators.required, Validators.maxLength(50)]],
      endCityControl: ['', [Validators.required, Validators.maxLength(50)]],
      transportControl: ['', [Validators.required]],
      bonusEstimeeControl: ['']
    },
    {
      validators: [CustomValidators.startEndDateValidator()]
    }
  );
  /** mission to update */
  mission!: Mission;
  /** toolbox for date formating */
  date: ToolBox = new ToolBox();
  /** natures list */
  natures: Nature[] = new Array();
  /** cities list  */
  cities: City[] = new Array();
  /** transpoirt list values */
  transports: Record<keyof typeof Transport, Transport>;
  //transports = Transport;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router
    , private srvMission: MissionsService,
    private srvNature: NaturesService, private srvCity: CityService,
    private srvTransport: TransportService) {

    this.transports = srvTransport.getTransportMap();
    this.updateNatures();
    this.updatecities();


  }
  /**
   * on récupére les données de la mission à modifier dés l'initialisation
   */
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      //get mission with id and fill the form
      this.srvMission.getMission(params['id']).subscribe(
        {
          next: (data) => {
            this.mission = data;// the form is filled here
            this.initFormValues(data);
          }
          , error: (err) => {
            console.log(err);// here is to display an error in case something went wrong
          }
        }
      )
    })
  }
  /**
   * form submit action
   * @returns
   */
  onSubmit(): void {
    if (this.formGroup.invalid) {
      return;
    }
    this.mission = this.collectForm();

    this.srvMission.updateMission(this.mission).subscribe({
      next: (data) => {
        this.router.navigate(['gestionMission']);
      },
      error: (err) => console.log(err)
    })
    //register the new data, if valid
  }
  /** form cancel action */
  onCancel(): void {
    //register the new mission, if valid
    this.router.navigate(['gestionMission'])
  }
  /** update mission natures list from service */
  updateNatures(): void {
    this.srvNature.getNatures().subscribe(
      {
        next: (data) => { this.natures = this.srvNature.getValidNatures(data) }
        ,
        error: (err) => { console.log(err); }
      }
    );

  }
  /** update cities lists from service */
  updatecities(): void {
    this.srvCity.getCities().subscribe(
      {
        next: (data) => { this.cities = data }
        ,
        error: (err) => { console.log(err); }
      }
    );

  }
  /**
   * return form's data's as a Mission Type Object
   */
  collectForm(): Mission {
    console.log(this.formGroup.controls["natureControl"].value);
    return {
      id: this.mission.id,
      bonus: this.mission.bonus,
      status: this.mission.status,
      transport: this.formGroup.controls["transportControl"].value,
      start: new Date(this.formGroup.controls["startDateControl"].value),
      end: new Date(this.formGroup.controls["endDateControl"].value),
      startCity: this.formGroup.controls["startCityControl"].value,

      arrivalCity: this.formGroup.controls["endCityControl"].value,

      nature: this.formGroup.controls["natureControl"].value,
      collaborator: this.mission.collaborator,
      expenses: this.mission.expenses
    };
  }
  /** initialize the from with the value
  of the provided Mission Object
  */
  initFormValues(data: Mission): void {
    this.formGroup.setValue({
      "natureControl": data.nature,
      "startCityControl": data.startCity,
      "endCityControl": data.arrivalCity,
      "transportControl": data.transport,
      "bonusEstimeeControl": data.bonus,
      "startDateControl": this.date.inputFormat(data.start),
      "endDateControl": this.date.inputFormat(data.end),
    });
  }

  compareById(itemOne: any, itemTwo: any) {
    return itemOne && itemTwo && itemOne.id == itemTwo.id;
  }

}
