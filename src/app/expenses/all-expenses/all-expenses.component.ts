import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Notiflix from 'notiflix';

import { Expense } from 'src/app/model/expense';
import { Mission } from 'src/app/model/mission';
import { ToolBox } from 'src/app/model/toolBox';
import { MissionsService } from 'src/app/service/missions.service';
import { TransportService } from 'src/app/service/transport.service';

@Component({
  selector: 'app-all-expenses',
  templateUrl: './all-expenses.component.html',
  styleUrls: ['./all-expenses.component.css']
})
export class AllExpensesComponent implements OnInit {
  /** list of user's missions  */
  missions: Array<Mission> = [];
  /** toolBox */
  tools: ToolBox = new ToolBox();

  constructor(private router: Router, private missionService: MissionsService, private transportService: TransportService) {

  }
  /** on component initalisation */
  ngOnInit(): void {
    this.missionService.getMissions().subscribe(
      {
        next: (missions: Mission[]) => {
          this.missions = missions;
        }
        , error: (error: HttpErrorResponse) => {
          Notiflix.Notify.failure(error.message);
        }
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



}
