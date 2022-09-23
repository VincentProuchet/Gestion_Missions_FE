import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DateTools } from 'src/app/model/date-tools';
import { Expense } from 'src/app/model/expense';
import { Mission } from 'src/app/model/mission';
import { MissionsService } from 'src/app/service/missions.service';
import { TransportService } from 'src/app/service/transport.service';

@Component({
  selector: 'app-all-expenses',
  templateUrl: './all-expenses.component.html',
  styleUrls: ['./all-expenses.component.css']
})
export class AllExpensesComponent implements OnInit {

  missions: Array<Mission> = [];
  dates: DateTools = new DateTools();
  constructor(private router: Router, private missionService: MissionsService, private transportService: TransportService) {
    /*
    this.missions = [{
      startDate: formatDate(new Date(), 'yyyy-MM-dd', 'en'), // retrieve the locale of the user
      endDate: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
      nature: "",
      startCity: "test",
      endCity: "test",
      transport: "",
      status: "test",
      bonusEstimee: "test",
      id: 0,
      charges: 0
    }]*/
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
    console.log("saved to storage");

  }

  //this is an utility function... maybe place it somewhere else
  sumExpenses(expenses: Expense[]): number {
    return expenses.map(expense => expense.cost).reduce((currSum, currElement) => currSum + currElement, 0);
  }

  getTransportValue(key: string): string {
    return this.transportService.getTransportValue(key);
  }

}
