import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Expense } from 'src/app/model/expense';
import { ExpenseType } from 'src/app/model/expense-type';
import { Mission } from 'src/app/model/mission';
import { ExpensesService } from 'src/app/service/expenses.service';
import { CustomValidators } from 'src/app/shared/custom-validators';
import { formatDate } from '@angular/common';
import { AP_Vars } from 'src/environments/API_Vars';
import * as Notiflix from 'notiflix';
import { HttpErrorResponse } from '@angular/common/http';
import { ToolBox } from 'src/app/model/toolBox';
import { Status } from 'src/app/model/status';
import { Transport } from 'src/app/model/transport';

@Component({
  selector: 'app-modify-expense',
  templateUrl: './modify-expense.component.html',
  styleUrls: ['./modify-expense.component.css']
})
/**
its consisting  of a button to make the action
and a modal containing a confirmation box
that appears

*/
export class ModifyExpenseComponent implements OnInit {

  dates: ToolBox = new ToolBox();

  @Input() expenseToModify!: Expense;
  @Input() mission!: Mission;
  @Output() onUpdateEvt: EventEmitter<Expense> = new EventEmitter();
  types!: ExpenseType[];

  formGroup: FormGroup = this.formBuilder.group({
    dateControl: ["", [Validators.required]],
    typeControl: ["", Validators.required],
    costControl: ["", [Validators.required, Validators.min(0), Validators.pattern("^[0-9]+(.[0-9])?[0-9]*$")]],
    tvaControl: ["", [Validators.required, Validators.min(0), Validators.max(100), Validators.pattern("^[0-9]+(.[0-9])?[0-9]*$")]]
  });

  //To ask : the tva seems to not to be used

  constructor(private formBuilder: FormBuilder, private expensesService: ExpensesService) {
  }

  ngOnInit(): void {
    // fill in of Expenses type
    this.expensesService.getExpenseTypes().subscribe(
      {
        next: (types: ExpenseType[]) => {
          this.types = types;
          if (this.expenseToModify != null) {
            this.formGroup.controls["typeControl"].setValue(this.expenseToModify.type);
          }
        }
        , error: (e: HttpErrorResponse) => { Notiflix.Notify.failure(e.error); }
      }
    );
  }
  /**
   *
   * @returns
   */
  onUpdate(): void {
    if (this.formGroup.invalid) {
      return;
    }
    this.onUpdateEvt.emit(this.collectForm());
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
  getTVA() {
    return this.formGroup.controls['tvaControl'];
  }
  /**
  *  set form with validator
  *  and provided data
   */
  initForm(expense: Expense): void {
    this.expenseToModify = expense;
    this.formGroup = this.formBuilder.group({
      dateControl: [this.dates.inputFormat(this.expenseToModify.date), [Validators.required, CustomValidators.dateBetweenValidator(this.mission.start, this.mission.end)]],
      typeControl: [this.expenseToModify.type, Validators.required],
      costControl: [this.expenseToModify.cost, [Validators.required, Validators.min(0), Validators.pattern("^[0-9]+(.[0-9])?[0-9]*$")]],
      tvaControl: [this.expenseToModify.tva, [Validators.required, Validators.min(0), Validators.max(100), Validators.pattern("^[0-9]+(.[0-9])?[0-9]*$")]]
    });
  }
  /**
    return all of the fomgroup data collected as an Expense
   */
  collectForm(): Expense {
    return {
      id: this.expenseToModify.id,
      idMission: this.expenseToModify.idMission,
      date: new Date(this.formGroup.controls['dateControl'].value),
      cost: this.formGroup.controls['costControl'].value,
      tva: this.formGroup.controls['tvaControl'].value,
      type: this.formGroup.controls['typeControl'].value
    }
  }
  /**
   * compare two items by their id
  may be refactored to a static tools box class
   * @param itemOne
   * @param itemTwo
   * @returns itemOne instance coresponding to the itemTwo.id
   */
  compareById(itemOne: any, itemTwo: any) {
    return itemOne && itemTwo && itemOne.id == itemTwo.id;
  }
}
