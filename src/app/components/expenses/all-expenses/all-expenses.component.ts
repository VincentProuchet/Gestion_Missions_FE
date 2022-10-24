import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Notiflix from 'notiflix';

import { Mission } from 'src/app/model/mission';
import { Status } from 'src/app/model/status';
import { ToolBox } from 'src/app/model/toolBox';
import { MissionsService } from 'src/app/service/missions.service';

@Component({
  selector: 'app-all-expenses',
  templateUrl: './all-expenses.component.html',
  styleUrls: ['./all-expenses.component.css']
})
/**
this component list all user's missions
in a condensed easiers to read table
allowing to edit expenses of user's missions
 */
export class AllExpensesComponent implements OnInit {
  /** list of user's missions  */
  missions: Array<Mission> = [];
  /** toolBox */
  tools: ToolBox = new ToolBox();

  constructor(private router: Router, private missionService: MissionsService) {

  }

  /** on component initalisation */
  ngOnInit(): void {
    this.missions = this.missionService.missions;
    this.missionService.getMissions().add(
      () => {
        this.missions = this.missionService.missions
      }

    );
  }
  /** edit action */
  onEdit(mission: Mission) {
    this.router.navigate(['modifierFrais', mission.id])
  }
  /** export action */
  onExport(mission: Mission) {
    this.missionService.pdfExport(mission);
  }

  /**
   * * filter missions
                      with validated status
                      and end date before now
   * @param mission
   * @returns
   */
  filter(mission: Mission[]) {
    let now: Date = new Date(Date.now());
    let before: Date = new Date(now);
    before.setMonth(before.getMonth() - 6);

    return mission.filter((m) => {
      return ((this.tools.statusEquals(m, Status.VALIDATED))
        && (now.getTime() > new Date(m.end).getTime()) && (before.getTime() < new Date(m.end).getTime()))
    }).sort((a: Mission, b: Mission) => {
      let c = new Date(a.start)
      let d = new Date(b.start)
      return d.getFullYear() - c.getFullYear();
    }).sort((a: Mission, b: Mission) => {
      let c = new Date(a.start)
      let d = new Date(b.start)
      return d.getMonth() - c.getMonth();
    })
      ;
  }


}
