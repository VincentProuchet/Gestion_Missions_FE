import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-expense',
  templateUrl: './create-expense.component.html',
  styleUrls: ['./create-expense.component.css']
})
export class CreateExpenseComponent implements OnInit {

  formGroup !: FormGroup;

  constructor(private formBuilder : FormBuilder) {
    this.formGroup = formBuilder.group({
      dateControl : '',
      typeControl : '',
      valueControl : ''
    })
  }

  ngOnInit(): void {
  }

  onCreate() {
    //register the new expense here
    console.log(this.formGroup.controls['dateControl'].value);
  }

}
