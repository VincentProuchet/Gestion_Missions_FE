import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DateTools } from 'src/app/model/date-tools';
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
  dates: DateTools = new DateTools();

  constructor(private route: ActivatedRoute, private router: Router, private expensesService: ExpensesService, private missionsService: MissionsService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {

      const missionID = params["id"];
      this.missionsService.getMission(missionID).subscribe(data => {
        this.mission = data;
      });
      this.expensesService.getMissionExpenses(missionID).subscribe(expenses => this.expenses = expenses);
    })//get the mission with given id



  }

  onCreate(expense: Expense) {
    this.expenses.push(expense);
  }

  onUpdate(expense: Expense) {
    let idx: number = this.expenses.indexOf(this.expenses.filter((exp) => exp.id === expense.id)[0]);
    this.expenses[idx] = expense;
  }

  onDelete(expense: Expense) {
    this.expenses = this.expenses.filter((exp) => exp !== expense);
  }


}
