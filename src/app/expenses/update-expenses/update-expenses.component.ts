import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as Notiflix from 'notiflix';
import { ToolBox } from 'src/app/model/toolBox';
import { Expense } from 'src/app/model/expense';
import { Mission } from 'src/app/model/mission';
import { ExpensesService } from 'src/app/service/expenses.service';
import { MissionsService } from 'src/app/service/missions.service';

@Component({
  selector: 'app-update-expenses',
  templateUrl: './update-expenses.component.html',
  styleUrls: ['./update-expenses.component.css']
})
/**
  Component for updating Expenses
  this is the main expense component
  it contains all expenses of a mission
 */
export class UpdateExpensesComponent implements OnInit {
  /**
    mission to modify expenses
   */
  mission!: Mission;
  /**
    list of existing expenses
   */
  expenses!: Expense[];
  /**
      tools for formating dates
      needed by the template
 */
  dates: ToolBox = new ToolBox();

  constructor(private route: ActivatedRoute, private router: Router, private expensesService: ExpensesService, private missionsService: MissionsService) { }
  /**
   * component initialisation
   */
  ngOnInit(): void {
    this.route.params.subscribe(
      {// we get the param
        next: (params) => {
          const missionID = params["id"];//get the mission with given id
          this.missionsService.getMission(missionID).subscribe(
            {// we get the mission
              next: (data: Mission) => {
                this.mission = data;
                // we get the expenses of the mission
                this.expensesService.getMissionExpenses(missionID).subscribe(
                  {
                    next: (expenses: Expense[]) => { this.expenses = expenses; }
                    , error: (e: HttpErrorResponse) => { Notiflix.Notify.failure(e.error); }
                  });
              },
              error: (e: HttpErrorResponse) => {
                Notiflix.Notify.failure(e.error);
              }
            });
        },
        error: (e: HttpErrorResponse) => {
          Notiflix.Notify.failure(e.error);
        }
      }

    )



  }
  /**
   * Creating a new expense
  this is a local expense list update
   * @param expense
   */
  onCreate(expense: Expense) {
    this.expenses.push(expense);
  }
  /**
   * updating an existing expense
    this is a local expense list update
   * @param expense
   */
  onUpdate(expense: Expense) {
    let idx: number = this.expenses.indexOf(this.expenses.filter((exp) => exp.id === expense.id)[0]);
    this.expenses[idx] = expense;
  }

  /**
   * deleting an expense
  this is a local expense list update
   * @param expense
   */
  onDelete(expense: Expense) {
    this.expenses = this.expenses.filter((exp) => exp !== expense);
  }


}
;
