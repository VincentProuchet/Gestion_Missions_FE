import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Expense } from '../model/expense';
import { filter, map, Observable } from 'rxjs';
import { ExpenseType } from '../model/expense-type';
import { API_Route } from 'src/environments/API_route';
import { environment } from 'src/environments/environment';

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

  /**
   * Description placeholder
   * @date 21/09/2022 - 12:12:45
   *
   * @private
   * @type {string}
   */
  private FULL_URL_EXPENSES = `http://localhost:3000/frais`;
  /**
   * Description placeholder
   * @date 21/09/2022 - 12:12:45
   *
   * @private
   * @type {string}
   */
  private FULL_URL_EXPENSES_TYPES = `http://localhost:3000/expenseTypes`;
  /**
   * Description placeholder
   * @date 21/09/2022 - 12:12:45
   *
   * @private
   * @type {*}
   */
  private API_AFTER_URL = API_Route.EXPENSE;
  /**
   * Description placeholder
   * @date 21/09/2022 - 12:12:45
   *
   * @private
   * @type {*}
   */
  private API_EXPENSE_TYPE = API_Route.TYPE;

  /**
   * Creates an instance of ExpensesService.
   * @date 21/09/2022 - 12:12:45
   *
   * @constructor
   * @param {HttpClient} http
   */
  constructor(private http: HttpClient) { }

  /**
   * Description placeholder
   * @date 21/09/2022 - 12:12:45
   *
   * @param {number} missionID
   * @returns {Observable<Expense[]>}
   */
  getMissionExpenses(missionID: number): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${environment.baseUrl}/${this.API_AFTER_URL}`).pipe(map(expenses => expenses.filter(expense => expense.idMission == missionID)));
  }
  /**
   * Description placeholder
   * @date 21/09/2022 - 12:12:45
   *
   * @param {number} expenseID
   * @returns {Observable<Expense>}
   */
  getExpense(expenseID: number): Observable<Expense> {
    return this.http.get<Expense>(`${environment.baseUrl}/${this.API_AFTER_URL}/${expenseID}`);
  }

  /**
   * demande
   * @date 21/09/2022 - 12:12:45
   *
   * @param {Expense} expense
   * @returns {Observable<Expense>}
   */
  addExpense(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(this.FULL_URL_EXPENSES, expense);
  }

  /**
   * Demande une suppression de la ligne de frais dans la base de données
   * @date 21/09/2022 - 12:12:45
   *
   * @param {Expense} expense
   * @returns {Observable<Expense>}
   */
  removeExpense(expense: Expense): Observable<Expense> {
    return this.http.delete<Expense>(`${environment.baseUrl}/${this.API_AFTER_URL}/${expense.id}`);
  }

  /** demande une
   * mise à jour la ligne de frais dans la base de donnée
   * @date 21/09/2022 - 12:12:45
   *
   * @param {Expense} expense
   * @returns {Observable<Expense>}
   */
  updateExpense(expense: Expense): Observable<Expense> {
    return this.http.put<Expense>(`${environment.baseUrl}/${this.API_AFTER_URL}/${expense.id}`, expense);

  }

  /**
   * Recupére les type de frais existant depuis le back-end
   * @date 21/09/2022 - 12:12:45
   *
   * @returns {Observable<ExpenseType[]>}
   */
  getExpenseTypes(): Observable<ExpenseType[]> {
    return this.http.get<ExpenseType[]>(`${environment.baseUrl}/${this.API_AFTER_URL}${this.API_EXPENSE_TYPE}`);
  }


}
