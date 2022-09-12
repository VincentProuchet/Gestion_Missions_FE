import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-modify-expense',
  templateUrl: './modify-expense.component.html',
  styleUrls: ['./modify-expense.component.css']
})
export class ModifyExpenseComponent implements OnInit {

  formGroup!: FormGroup;

  @Input() expenseToModify : any;
  
  constructor(private formBuilder : FormBuilder) {
    this.formGroup = formBuilder.group({
      dateControl : '',
      typeControl : '',
      valueControl : ''
    });
  }

  ngOnInit(): void {
  }

  onUpdate(){}
}
