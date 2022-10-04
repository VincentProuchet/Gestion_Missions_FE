import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Notiflix from 'notiflix';

import { Expense } from 'src/app/model/expense';
import { Mission } from 'src/app/model/mission';
import { ToolBox } from 'src/app/model/ToolBox';
import { MissionsService } from 'src/app/service/missions.service';
import { TransportService } from 'src/app/service/transport.service';

@Component({
  selector: 'app-all-expenses',
  templateUrl: './all-expenses.component.html',
  styleUrls: ['./all-expenses.component.css']
})
export class AllExpensesComponent implements OnInit {

  missions: Array<Mission> = [];
  dates: ToolBox = new ToolBox();
  constructor(private router: Router, private missionService: MissionsService, private transportService: TransportService) {

  }

  ngOnInit(): void {
    this.missionService.getMissions().subscribe(missions => this.missions = missions);
  }

  onEdit(mission: Mission) {
    this.router.navigate(['modifierFrais', mission.id])
  }

  onExport(mission: Mission) {
    //this.router.navigate(['mission/new']);
    localStorage.setItem("mission", mission.toString());
    console.log(mission.id);
    Notiflix.Notify.success("saved to storage");

  }

  //this is an utility function... maybe place it somewhere else
  sumExpenses(expenses: Expense[]): number {
    return expenses.map(expense => expense.cost).reduce((currSum, currElement) => currSum + currElement, 0);
  }

  getTransportValue(key: string): string {
    return this.transportService.getTransportValue(key);
  }

}
