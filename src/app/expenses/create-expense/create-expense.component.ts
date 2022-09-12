import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExpensesService } from 'src/app/service/expenses.service';

@Component({
  selector: 'app-create-expense',
  templateUrl: './create-expense.component.html',
  styleUrls: ['./create-expense.component.css']
})
export class CreateExpenseComponent implements OnInit {

  formGroup !: FormGroup;

  @Input() missionID !: number;

  constructor(private formBuilder : FormBuilder, private expensesService:ExpensesService) {
    this.formGroup = formBuilder.group({
      dateControl : '',
      typeControl : '',
      costControl : ''
    })
  }

  ngOnInit(): void {
  }

  onCreate() {
    //register the new expense here
    console.log(this.formGroup.controls['dateControl'].value);

    this.expensesService.addExpense({
      date: this.formGroup.controls['dateControl'].value,
      type: this.formGroup.controls['typeControl'].value,
      cost: this.formGroup.controls['costControl'].value,
      id: 0,
      idMission: this.missionID,
      tva: 0
    }).subscribe(() => console.log("added"));
  }

}
