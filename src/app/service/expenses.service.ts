import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Expense } from '../model/expense';
import { filter, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

  private FULL_URL = `http://localhost:3000/frais`;

  constructor(private http: HttpClient) { }

  getMissionExpenses(missionID: number): Observable<Expense[]> {
    return this.http.get<Expense[]>(this.FULL_URL).pipe(map(expenses => expenses.filter(expense => expense.idMission == missionID)));
  }
  getExpense(expenseID: number): Observable<Expense> {
    return this.http.get<Expense>(this.FULL_URL + '/' + expenseID);
  }

  addExpense(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(this.FULL_URL, expense);
  }

  removeExpense(expense: Expense): Observable<Expense> {
    return this.http.delete<Expense>(this.FULL_URL + '/' + expense.id);
  }

  updateExpense(expense: Expense): Observable<Expense> {
    return this.http.put<Expense>(this.FULL_URL + '/' + expense.id, expense);

  }



}
