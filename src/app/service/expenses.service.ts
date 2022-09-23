import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Expense } from '../model/expense';
import { filter, map, Observable } from 'rxjs';
import { ExpenseType } from '../model/expense-type';
import { API_Route } from 'src/environments/API_route';
import { environment } from 'src/environments/environment';
import { AP_Vars } from 'src/environments/API_Vars';

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
  /**Fin de l'url pour les route du Back-end   */
  private API_EXPENSE_TYPE = API_Route.EXPENSE + API_Route.TYPE;

  /**
   * Creates an instance of ExpensesService.
   */
  constructor(private http: HttpClient) { }

  /**
   * Demande les lignes de frais d'une mission
    */
  getMissionExpenses(missionID: number): Observable<Expense[]> {
    //TODO: readapter pour que ce soit le BackEnd qui n'envoi que les lignes de frais de la mission demandée
    return this.http.get<Expense[]>(`${AP_Vars.BEConnectionUrl}/${this.API_AFTER_URL}`).pipe(map(expenses => expenses.filter(expense => expense.idMission == missionID)));
  }
  /**
   * Demande une ligne de frais à la base de donées d'après son identifiant
   * @date 21/09/2022 - 12:12:45
   */
  getExpense(expenseID: number): Observable<Expense> {
    return this.http.get<Expense>(`${AP_Vars.BEConnectionUrl}/${this.API_AFTER_URL}/${expenseID}`);
  }

  /**
   * demande d'ajouter une ligne de frais à la base de données
   * @date 21/09/2022 - 12:12:45

   */
  addExpense(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(`${AP_Vars.BEConnectionUrl}/${this.API_AFTER_URL}`, expense);
  }

  /**
   * Demande une suppression de la ligne de frais dans la base de données
   * @date 21/09/2022 - 12:12:45
   *
   * @param {Expense} expense
   * @returns {Observable<Expense>}
   */
  removeExpense(expense: Expense): Observable<Expense> {
    return this.http.delete<Expense>(`${AP_Vars.BEConnectionUrl}/${this.API_AFTER_URL}/${expense.id}`);
  }

  /**
   * demande une
   * mise à jour de la ligne de frais
   * dans la base de donnée
   * @date 21/09/2022 - 12:12:45
   *
   * @param {Expense} expense
   * @returns {Observable<Expense>}
   */
  updateExpense(expense: Expense): Observable<Expense> {
    return this.http.put<Expense>(`${AP_Vars.BEConnectionUrl}/${this.API_AFTER_URL}/${expense.id}`, expense);

  }

  /**
   * Recupére les type de frais existant depuis le back-end
   * @date 21/09/2022 - 12:12:45
   *
   * @returns {Observable<ExpenseType[]>}
   */
  getExpenseTypes(): Observable<ExpenseType[]> {
    return this.http.get<ExpenseType[]>(`${AP_Vars.BEConnectionUrl}/${this.API_EXPENSE_TYPE}`);
  }


}
