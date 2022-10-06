import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import * as Notiflix from 'notiflix';

import { Expense } from 'src/app/model/expense';
import { ToolBox } from 'src/app/model/toolBox';
import { ExpensesService } from 'src/app/service/expenses.service';

@Component({
  selector: 'app-remove-expense',
  templateUrl: './remove-expense.component.html',
  styleUrls: ['./remove-expense.component.css']
})
/**
Remove Expense Componet
its consisting  of a button to make the action
and a modal containing a confirmation box
that appears
 */
export class RemoveExpenseComponent implements OnInit {
  /** expense to remove  */
  @Input() expenseToRemove !: Expense;
  /** event to emit */
  @Output() onDeleteEvt: EventEmitter<Expense> = new EventEmitter();
  /** DateTool used by the template */
  tools: ToolBox = new ToolBox();

  constructor(private expensesService: ExpensesService, private router: Router) {
  }

  ngOnInit(): void {
  }
  /**
   * action on deletion confirmation
   */
  onRemovalConfirmed() {
    this.onDeleteEvt.emit(this.expenseToRemove);
  }
}
