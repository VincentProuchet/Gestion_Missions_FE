import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


import { Expense } from 'src/app/model/expense';
import { ToolBox } from 'src/app/model/toolBox';

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

  constructor() {
  }

  ngOnInit(): void {
  }
  /**
   * action on deletion confirmation
   */
  onRemovalConfirmed() {
    this.onDeleteEvt.emit(this.expenseToRemove);
  }
  initForm(expense: Expense): void {
    this.expenseToRemove = expense;
  }

}
