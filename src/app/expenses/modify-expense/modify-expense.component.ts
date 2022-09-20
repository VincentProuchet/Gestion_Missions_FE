import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Expense } from 'src/app/model/expense';
import { ExpenseType } from 'src/app/model/expense-type';
import { Mission } from 'src/app/model/mission';
import { ExpensesService } from 'src/app/service/expenses.service';
import { CustomValidators } from 'src/app/shared/custom-validators';

@Component({
  selector: 'app-modify-expense',
  templateUrl: './modify-expense.component.html',
  styleUrls: ['./modify-expense.component.css']
})
export class ModifyExpenseComponent implements OnInit {

  formGroup!: FormGroup;

  @Input() expenseToModify!: Expense;
  @Input() mission !: Mission;
  @Output() onUpdateEvt: EventEmitter<Expense> = new EventEmitter();
  types!: ExpenseType[];

  //To ask : the tva seems to not to be used

  constructor(private formBuilder: FormBuilder, private expensesService: ExpensesService) {
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      dateControl: [this.expenseToModify.date, [Validators.required, CustomValidators.dateBetweenValidator(this.mission.start, this.mission.end)]],
      typeControl: [this.expenseToModify.type.name, Validators.required],
      costControl: [this.expenseToModify.cost, [Validators.required, Validators.min(0), Validators.pattern("^[0-9]+(.[0-9])?[0-9]*$")]]
    });
    this.expensesService.getExpenseTypes().subscribe(types => this.types = types);
  }

  onUpdate() {
    if (this.formGroup.invalid) {
      return;
    }
    this.expensesService.updateExpense({
      id: this.expenseToModify.id,
      idMission: this.expenseToModify.idMission,
      date: this.formGroup.controls['dateControl'].value,
      cost: this.formGroup.controls['costControl'].value,
      tva: 0,
      type: {
        name: this.formGroup.controls['typeControl'].value
      }
    }).subscribe(
      (expense) => {
        this.onUpdateEvt.emit(expense);
      });

  }


  getDate() {
    return this.formGroup.controls['dateControl'];
  }
  getType() {
    return this.formGroup.controls['typeControl'];
  }
  getCost() {
    return this.formGroup.controls['costControl'];
  }

  resetForm() {
    this.formGroup.controls['dateControl'].setValue(this.expenseToModify.date);
    this.formGroup.controls['typeControl'].setValue(this.expenseToModify.type.name);
    this.formGroup.controls['costControl'].setValue(this.expenseToModify.cost);
  }
}
