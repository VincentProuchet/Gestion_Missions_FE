import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Expense } from 'src/app/model/expense';
import { Mission } from 'src/app/model/mission';
import { MissionsService } from 'src/app/service/missions.service';

@Component({
  selector: 'app-all-expenses',
  templateUrl: './all-expenses.component.html',
  styleUrls: ['./all-expenses.component.css']
})
export class AllExpensesComponent implements OnInit {

  missions !: Array<Mission>;

  constructor(private router: Router, private missionService: MissionsService) {
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

  onEdit(missionIndex: number) {
    this.router.navigate(['modifierFrais', this.missions[missionIndex].id])
  }

  onExport(missionIndex: number) {
    //this.router.navigate(['mission/new']);
    console.log(missionIndex);
  }

  //this is an utility function... maybe place it somewhere else
  sumExpenses(expenses: Expense[]): number {
    return expenses.map(expense => expense.cost).reduce((currSum, currElement) => currSum + currElement);
  }


}
