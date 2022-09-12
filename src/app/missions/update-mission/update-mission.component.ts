import { formatDate, getLocaleId } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Nature } from 'src/app/model/nature';
import { MissionsService } from 'src/app/service/missions.service';
import { NaturesService } from 'src/app/service/natures.service';

@Component({
  selector: 'app-update-mission',
  templateUrl: './update-mission.component.html',
  styleUrls: ['./update-mission.component.css']
})
export class UpdateMissionComponent implements OnInit {

  formGroup: FormGroup;
  mission: any;
  natures: Nature[];


  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private srvMission: MissionsService, private srvNature: NaturesService) {    /**formulaire */
    this.formGroup = formBuilder.group({
      startDateControl: ['', Validators.required],
      endDateControl: ['', Validators.required],
      natureControl: ['', Validators.required],
      startCityControl: ['', Validators.required],
      endCityControl: ['', Validators.required],
      transportControl: ['', Validators.required],
      bonusEstimeeControl: ['', Validators.required]

    });
    this.natures = this.srvNature.getValidNatures();
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
  /**
   * on récupére les données de la mission à modifier dés l'initialisation
   */
  ngOnInit(): void {



    this.route.params.subscribe(params => {
      console.log(params['id'])
      //get mission with id and fill the form
      this.srvMission.getMission(params['id']).subscribe(
        {
          next: (data) => { this.mission = data }// the form is filled here
          , error: (err) => {
            console.log(err);// here is to display an error in case something went wrong
          }
        }
      )
    })
  }

  onSubmit(): void {
    console.log("start date control " + this.formGroup.controls["startDateControl"].value);
    //register the new data, if valid
    this.router.navigate(['gestionMission'])
  }
  onCancel(): void {
    //register the new mission, if valid
    this.router.navigate(['gestionMission'])
  }
}
