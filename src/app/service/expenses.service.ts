import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Expense } from '../model/expense';
import { map, Observable, Subscription } from 'rxjs';
import { ExpenseType } from '../model/expense-type';
import { API_Route } from 'src/environments/API_route';
import { AP_Vars } from 'src/environments/API_Vars';
import * as Notiflix from 'notiflix';
import { ToolBox } from '../model/toolBox';

/**
 * Description placeholder
 * @date 21/09/2022 - 12:12:45
 *
 * @export
 * @class ExpensesService
 * @typedef {ExpensesService}
 */
@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

  /** URL de test du mock back-end  */
  private FULL_URL_EXPENSES = `http://localhost:3000/expense`;
  /**  URL de test du mock back-end */
  private FULL_URL_EXPENSES_TYPES = `http://localhost:3000/expense_type`;
  /** Fin de l'url pour les route du Back-end */
  private API_AFTER_URL = API_Route.EXPENSE;

  private API_MISSION_URL = API_Route.MISSION;
  /**Fin de l'url pour les route du Back-end   */
  private API_EXPENSE_TYPE = API_Route.EXPENSE + API_Route.TYPE;

  private tools: ToolBox = new ToolBox();

  /** list des frais souvent limités à une mission */
  public expenses: Expense[] = [];
  /** frais utilisé pour les modifications d'un frai */
  public expense!: Expense;
  /** liste de type de frais */
  public types: ExpenseType[] = [];
  /** type de frais non utilisé */
  public type!: ExpenseType;

  /**
   * Creates an instance of ExpensesService.
   */
  constructor(private http: HttpClient) { }

  /**
   * Demande les lignes de frais d'une mission
    */
  getMissionExpenses(missionID: number): Subscription {
    //TODO: readapter pour que ce soit le BackEnd qui n'envoi que les lignes de frais de la mission demandée
    return this.http.get<Expense[]>(`${AP_Vars.BEConnectionUrl}/${this.API_AFTER_URL}`).pipe(map(expenses => expenses.filter(expense => expense.idMission == missionID)))
      .subscribe(
        {
          next: (expenses: Expense[]) => { this.expenses = expenses; }
          , error: (e: HttpErrorResponse) => { Notiflix.Notify.failure(e.error.message) }
        });;

  }
  /**
   * Demande une ligne de frais à la base de donées d'après son identifiant
   * @date 21/09/2022 - 12:12:45
   */
  getExpense(expenseID: number): Subscription {
    return this.http.get<Expense>(`${AP_Vars.BEConnectionUrl}/${this.API_AFTER_URL}/${expenseID}`).subscribe(
      {
        next: (expense: Expense) => { this.expense = expense; }
        , error: (e: HttpErrorResponse) => { Notiflix.Notify.failure(e.error.message) }
      }
    );
  }

  /**
   * demande d'ajouter une ligne de frais à la base de données
   * @date 21/09/2022 - 12:12:45

   */
  addExpense(expense: Expense): Subscription {
    return this.http.post<Expense>(`${AP_Vars.BEConnectionUrl}/${this.API_AFTER_URL}`, expense).subscribe(
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
   * Demande une suppression de la ligne de frais dans la base de données
   * @date 21/09/2022 - 12:12:45
   *
   * @param {Expense} expense
   * @returns {Subscription}
   */
  removeExpense(expense: Expense): Subscription {
    return this.http.delete<Expense>(`${AP_Vars.BEConnectionUrl}/${this.API_AFTER_URL}/${expense.id}`).subscribe(
      {
        next: () => {
          this.expenses = this.expenses.filter((exp) => exp !== expense);
          Notiflix.Notify.info(`le frais ${expense.type.name}  du ${this.tools.format(expense.date)} a bien été supprimé`);
        }
        , error: (e: HttpErrorResponse) => { Notiflix.Notify.failure(e.error.message); }
      }
    );;
  }

  /**
   * demande une
   * mise à jour de la ligne de frais
   * dans la base de donnée
   * @date 21/09/2022 - 12:12:45
   *
   * @param {Expense} expense
   * @returns {Subscription}
   */
  updateExpense(expense: Expense): Subscription {
    return this.http.put<Expense>(`${AP_Vars.BEConnectionUrl}/${this.API_AFTER_URL}/${expense.id}`, expense).subscribe(
      {
        next: (data: Expense) => {
          let idx: number = this.expenses.indexOf(this.expenses.filter((exp) => exp.id === expense.id)[0]);
          this.expenses[idx] = data;
          Notiflix.Notify.info(`le frais ${data.type.name} du ${this.tools.format(data.date)} est modifié `);
        }
        , error: (e: HttpErrorResponse) => { Notiflix.Notify.failure(e.error.message); }
      }
    );

  }

  /**
   * Recupére les type de frais existant depuis le back-end
   * @date 21/09/2022 - 12:12:45
   *
   * @returns {Subscription}
   */
  getExpenseTypes(): Subscription {
    return this.http.get<ExpenseType[]>(`${AP_Vars.BEConnectionUrl}/${this.API_EXPENSE_TYPE}`).subscribe(
      {
        next: (types: ExpenseType[]) => {
          this.types = types;
        }
        , error: (e: HttpErrorResponse) => { Notiflix.Notify.failure(e.error); }
      }
    );
  }


}
