import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Notiflix from 'notiflix';
import { Mission } from 'src/app/model/mission';
import { Status } from 'src/app/model/status';
import { MissionsService } from 'src/app/service/missions.service';
import { TransportService } from 'src/app/service/transport.service';
import { Actions } from 'src/app/model/actions';
import { ToolBox } from 'src/app/model/toolBox';

@Component({
  selector: 'app-validation-mission',
  templateUrl: './validation-mission.component.html',
  styleUrls: ['./validation-mission.component.css']
})
/**
 composant pour le changement des status de mission
 en dépit de son nom, il gêre aussi bien la validation que le rejet le reset du statut
 */
export class ValidationMissionComponent implements OnInit {
  /** liste des missions */
  missions: Mission[] = [];
  /** mission sur laqelle est exécutée une action  elle est passé au composant confirm-Action */
  mission!: Mission;
  /** action exécuté passée aussi au composant confirm-action */
  action !: Actions;
  actions: typeof Actions = Actions;
  /** enumeration des status */
  statusEnum: typeof Status = Status;
  /** toolBox */
  tools: ToolBox = new ToolBox();

  constructor(private router: Router, private missionService: MissionsService, private transportService: TransportService) { }

  ngOnInit(): void {
    this.updateMission();
  }
  /**
   * fetch missions concerned by the connected manager
      a user can only see mission of its team members
   */
  updateMission() {
    this.missionService.getMissionsToValidate().subscribe({
      next: (data: Mission[]) => {
        this.missions = data;
      },
      error: (err: HttpErrorResponse) => {
        Notiflix.Notify.failure(err.error.message);
      }
    });
  }
  /**
      send a demand to
      validate the  mission to the BE
  */
  onValidate(mission: Mission) {
    this.missionService.validateMission(mission).subscribe({
      next: (data: Mission) => {
        let idx = this.missions.indexOf(mission);
        this.missions[idx] = data;
      },
      error: (err: HttpErrorResponse) => {
        Notiflix.Notify.failure(err.error.message);
      }

    })
  }
  /**
      send a demand to
      reject the  mission to the BE
  */
  onReject(mission: Mission) {
    this.missionService.rejectMission(mission).subscribe({
      next: (data: Mission) => {
        let idx = this.missions.indexOf(mission);
        this.missions[idx] = data;
      },
      error: (err: HttpErrorResponse) => {
        Notiflix.Notify.failure(err.error.message);
      }
    })
  }
  /**
      send a demand to
      reset the  mission to the BE
  */
  onReset(mission: Mission) {
    //TODO: retirer ligne suivante une fois relié au back end
    //mission.status = this.statusEnum.WAITING_VALIDATION;

    this.missionService.resetMission(mission).subscribe({
      next: (data: Mission) => {
        let idx = this.missions.indexOf(mission);
        this.missions[idx] = data;

      },
      error: (err: HttpErrorResponse) => {
        Notiflix.Notify.failure(err.error.message);
      }
    })
  }
  onAction(mission: Mission, action: Actions): void {
    this.action = action;
    this.mission = mission;
  }


}
