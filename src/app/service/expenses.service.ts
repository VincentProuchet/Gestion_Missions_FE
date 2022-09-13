import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Expense } from '../model/expense';
import { filter, map, Observable } from 'rxjs';
import { ExpenseType } from '../model/expense-type';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

  private FULL_URL_EXPENSES = `http://localhost:3000/frais`;
  private FULL_URL_EXPENSES_TYPES = `http://localhost:3000/expenseTypes`;

  constructor(private http: HttpClient) { }

  getMissionExpenses(missionID: number): Observable<Expense[]> {
    return this.http.get<Expense[]>(this.FULL_URL_EXPENSES).pipe(map(expenses => expenses.filter(expense => expense.idMission == missionID)));
  }
  getExpense(expenseID: number): Observable<Expense> {
    return this.http.get<Expense>(this.FULL_URL_EXPENSES + '/' + expenseID);
  }

  addExpense(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(this.FULL_URL_EXPENSES, expense);
  }

  removeExpense(expense: Expense): Observable<Expense> {
    return this.http.delete<Expense>(this.FULL_URL_EXPENSES + '/' + expense.id);
  }

  updateExpense(expense: Expense): Observable<Expense> {
    return this.http.put<Expense>(this.FULL_URL_EXPENSES + '/' + expense.id, expense);

  }

  getExpenseTypes() : Observable<ExpenseType[]> {
    return this.http.get<ExpenseType[]>(this.FULL_URL_EXPENSES_TYPES);
  }


}
