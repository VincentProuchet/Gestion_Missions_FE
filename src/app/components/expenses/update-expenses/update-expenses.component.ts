import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as Notiflix from 'notiflix';
import { ToolBox } from 'src/app/model/toolBox';
import { Expense } from 'src/app/model/expense';
import { Mission } from 'src/app/model/mission';
import { ExpensesService } from 'src/app/service/expenses.service';
import { MissionsService } from 'src/app/service/missions.service';
import { ModifyExpenseComponent } from '../modify-expense/modify-expense.component';
import { RemoveExpenseComponent } from '../remove-expense/remove-expense.component';

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
  expenses: Expense[] = new Array();
  /** ici on créer une référence au composant enfant  d'édition d'un frais */
  @ViewChild(ModifyExpenseComponent)
  private modify!: ModifyExpenseComponent;

  /** ici on créer une référence au composant enfant de suppression d'un frais */
  @ViewChild(RemoveExpenseComponent)
  private remove!: RemoveExpenseComponent;
  /**
      tools for formating dates
      needed by the template
 */
  tools: ToolBox = new ToolBox();

  constructor(private route: ActivatedRoute, private expensesService: ExpensesService, private missionsService: MissionsService) { }
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
                    , error: (e: HttpErrorResponse) => { Notiflix.Notify.failure(e.error.message) }
                  });
              },
              error: (e: HttpErrorResponse) => {
                Notiflix.Notify.failure(e.error.message);
              }
            });
        },
        error: (e: HttpErrorResponse) => {
          Notiflix.Notify.failure(e.error.message);
        }
      }

    )



  }
  /**
  sending BE a request to add a new expense to a mission
  refreshing the local list on success
   * @param expense
   */
  onCreate(expense: Expense) {
    this.expensesService.addExpense(expense).subscribe(
      {
        next: (expense: Expense) => {
          this.expenses.push(expense);
          Notiflix.Notify.success("frais ajouté avec succés ");
        },
        error: (e: HttpErrorResponse) => {
          Notiflix.Notify.failure(e.error.message);
        }
      }
    );
  }
  /**
   * updating an existing expense
    in BE
    and localy on success
   * @param expense
   */
  onUpdate(expense: Expense) {
    this.expensesService.updateExpense(expense).subscribe(
      {
        next: (data: Expense) => {
          let idx: number = this.expenses.indexOf(this.expenses.filter((exp) => exp.id === expense.id)[0]);
          this.expenses[idx] = expense;
          Notiflix.Notify.info(`le frais du ${this.tools.format(data.date)} est modifié `);
        }
        , error: (e: HttpErrorResponse) => { Notiflix.Notify.failure(e.error.message); }
      }
    );
  }

  /**
   * deleting an expense in BE
  and in local on success
   * @param expense
   */
  onDelete(expense: Expense) {
    this.expensesService.removeExpense(expense).subscribe(
      {
        next: () => {
          Notiflix.Notify.info(`le frais ${expense.type.name}  du ${this.tools.format(expense.date)} a bien été supprimé`);
          this.expenses = this.expenses.filter((exp) => exp !== expense);
        }
        , error: (e: HttpErrorResponse) => { Notiflix.Notify.failure(e.error.message); }
      }
    );
  }

  /** lors d'une action dans le composant
    this is used to init the expense edit form
    I add to resort to this trick because the form is inside a modal
    that already exist in the page

    the main problem was validators who needed values to be set by the formBuilder
    and couldn't be modify after that even by references

  */
  onAction(selectedExpense: Expense): void {
    this.modify.initForm(selectedExpense);
    this.remove.initForm(selectedExpense)
  }


}
;