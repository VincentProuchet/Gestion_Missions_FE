import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Expense } from 'src/app/model/expense';
import { Mission } from 'src/app/model/mission';
import { ExpensesService } from 'src/app/service/expenses.service';
import { MissionsService } from 'src/app/service/missions.service';

@Component({
  selector: 'app-update-expenses',
  templateUrl: './update-expenses.component.html',
  styleUrls: ['./update-expenses.component.css']
})
export class UpdateExpensesComponent implements OnInit {

  mission!: Mission;
  expenses!: Expense[];

  constructor(private route: ActivatedRoute, private router: Router, private expensesService: ExpensesService, private missionsService: MissionsService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {

      const missionID = params["id"];
      this.missionsService.getMission(missionID).subscribe(mission => {
        this.mission = mission;
      });
      this.expensesService.getMissionExpenses(missionID).subscribe(expenses => this.expenses = expenses);
    })//get the mission with given id



  }
}
