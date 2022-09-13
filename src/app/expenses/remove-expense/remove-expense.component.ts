import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Expense } from 'src/app/model/expense';
import { ExpensesService } from 'src/app/service/expenses.service';

@Component({
  selector: 'app-remove-expense',
  templateUrl: './remove-expense.component.html',
  styleUrls: ['./remove-expense.component.css']
})
export class RemoveExpenseComponent implements OnInit {

  @Input() expenseToRemove !: Expense;

  constructor(private expensesService: ExpensesService, private router: Router) { }

  ngOnInit(): void {
    //this.expensesService.getExpense(this.dataExpenseToRemove).subscribe(expense => this.expenseToRemove = expense);

  }

  onRemovalConfirmed() {
    this.expensesService.removeExpense(this.expenseToRemove).subscribe(() => console.log("removed : " + this.expenseToRemove.id));
  }
}
