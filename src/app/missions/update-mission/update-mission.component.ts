import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Mission } from 'src/app/model/mission';
import { Nature } from 'src/app/model/nature';
import { Transport } from 'src/app/model/transport';
import { MissionsService } from 'src/app/service/missions.service';
import { NaturesService } from 'src/app/service/natures.service';
import { TransportService } from 'src/app/service/transport.service';
import { CustomValidators } from 'src/app/shared/custom-validators';

@Component({
  selector: 'app-update-mission',
  templateUrl: './update-mission.component.html',
  styleUrls: ['./update-mission.component.css']
})
export class UpdateMissionComponent implements OnInit {

  formGroup: FormGroup;
  mission!: Mission;
  missionStart: Date = new Date();
  missionEnd: Date = new Date();
  natures: Nature[] = new Array();
  transports: Record<keyof typeof Transport, Transport>;



  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router
    , private srvMission: MissionsService, private srvNature: NaturesService, private srvTransport: TransportService) {
    this.transports = srvTransport.getTransportMap();


    /**formulaire */
    this.formGroup = formBuilder.group({
      startDateControl: ['', [Validators.required]],
      endDateControl: ['', [Validators.required]],
      natureControl: ['', [Validators.required]],
      startCityControl: ['', [Validators.required, Validators.maxLength(50)]],
      endCityControl: ['', [Validators.required, Validators.maxLength(50)]],
      transportControl: ['', [Validators.required]],
      bonusEstimeeControl: ['']
    }, { validators: [CustomValidators.startEndDateValidator()] });

    this.updateNatures();
  }
  /**
   * on récupére les données de la mission à modifier dés l'initialisation
   */
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params['id'])
      //get mission with id and fill the form
      this.srvMission.getMission(params['id']).subscribe(
        {
          next: (data) => {
            this.mission = data;// the form is filled here
            this.formGroup.controls["startDateControl"].setValue(this.mission.start);
            this.formGroup.controls["endDateControl"].setValue(this.mission.end);
            this.formGroup.controls["natureControl"].setValue(this.mission.nature);
            this.formGroup.controls["startCityControl"].setValue(this.mission.startCity.name);
            this.formGroup.controls["endCityControl"].setValue(this.mission.arrivalCity.name);
            this.formGroup.controls["transportControl"].setValue(this.mission.transport);
            this.formGroup.controls["bonusEstimeeControl"].setValue(this.mission.bonus);
          }
          , error: (err) => {
            console.log(err);// here is to display an error in case something went wrong
          }
        }
      )
    })
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      return;
    }
    this.mission.start = this.missionStart;
    this.mission.end = this.missionEnd;
    this.srvMission.updateMission(this.mission).subscribe({
      next: (data) => {
        this.router.navigate(['gestionMission']);
      },
      error: (err) => console.log(err)
    })
    //register the new data, if valid
  }
  onCancel(): void {
    //register the new mission, if valid
    this.router.navigate(['gestionMission'])
  }

  updateNatures() {
    this.srvNature.getNatures().subscribe(
      {
        next: (data) => { this.natures = this.srvNature.getValidNatures(data) }
        ,
        error: (err) => { console.log(err); }
      }
    );

  }
}
