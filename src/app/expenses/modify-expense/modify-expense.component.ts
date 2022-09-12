import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Expense } from 'src/app/model/expense';
import { ExpensesService } from 'src/app/service/expenses.service';

@Component({
  selector: 'app-modify-expense',
  templateUrl: './modify-expense.component.html',
  styleUrls: ['./modify-expense.component.css']
})
export class ModifyExpenseComponent implements OnInit {

  formGroup!: FormGroup;

  @Input() expenseToModify!: Expense;

  //To ask : the tva seems to not to be used

  constructor(private formBuilder: FormBuilder, private expensesService: ExpensesService) {
    this.formGroup = formBuilder.group({
      dateControl: '',
      typeControl: '',
      costControl: ''
    });
  }

  ngOnInit(): void {
  }

  onUpdate() {
    this.expensesService.updateExpense({
      id: this.expenseToModify.id,
      idMission: this.expenseToModify.idMission,
      date: this.formGroup.controls['dateControl'].value,
      cost: this.formGroup.controls['costControl'].value,
      tva: 0,
      type: this.formGroup.controls['typeControl'].value
    }).subscribe(() => console.log("modified"));
    
  }
}
