import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DateTools } from 'src/app/model/date-tools';
import { Expense } from 'src/app/model/expense';
import { ExpensesService } from 'src/app/service/expenses.service';

@Component({
  selector: 'app-remove-expense',
  templateUrl: './remove-expense.component.html',
  styleUrls: ['./remove-expense.component.css']
})
export class RemoveExpenseComponent implements OnInit {

  @Input() expenseToRemove !: Expense;
  @Output() onDeleteEvt: EventEmitter<Expense> = new EventEmitter();

  dates: DateTools;

  constructor(private expensesService: ExpensesService, private router: Router) {
    this.dates = new DateTools();
  }

  ngOnInit(): void {
    //this.expensesService.getExpense(this.dataExpenseToRemove).subscribe(expense => this.expenseToRemove = expense);

  }

  onRemovalConfirmed() {
    this.expensesService.removeExpense(this.expenseToRemove).subscribe(
      () => {
        this.onDeleteEvt.emit(this.expenseToRemove);
      }
    );
  }
}
