import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Expense } from 'src/app/model/expense';
import { ExpenseType } from 'src/app/model/expense-type';
import { Mission } from 'src/app/model/mission';
import { ExpensesService } from 'src/app/service/expenses.service';
import { CustomValidators } from 'src/app/model/custom-validators';
import * as Notiflix from 'notiflix';
import { HttpErrorResponse } from '@angular/common/http';
import { ToolBox } from 'src/app/model/toolBox';


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
  /** control names
   this little object bear the names used in the template's formcontrols
    */
  controlNames = {
    date: 'dateControl',
    type: 'typeControl',
    cost: 'costControl',
    tva: 'tvaControl',
  }

  /** toolbox  */
  tools: ToolBox = new ToolBox();
  /** expense the component work on */
  @Input() expenseToModify!: Expense;
  /** mission the expense is attached to*/
  @Input() mission!: Mission;
  /** event of expense updating */
  @Output() onUpdateEvt: EventEmitter<Expense> = new EventEmitter();
  /** event to emit */
  @Output() onDeleteEvt: EventEmitter<Expense> = new EventEmitter();

  /** type of expense list for select options */
  types!: ExpenseType[];
  /** formgroup  */
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
    this.expensesService.getExpenseTypes().add(
      () => {
        this.types = this.expensesService.types;

      }


    );
  }
  /**
   * this is colled on form's validation
   * it chacks form validity
   * collect it and send it in an event
   *
   */
  onUpdate(): void {
    if (!this.formGroup.invalid) {
      this.onUpdateEvt.emit(this.collectForm());
    }
  }
  /**
    this is a fancy of me
    since we are displaying a confirm choice
    why not giving the ability to delete it directly
    from the updating box ?
    * action on deletion confirmation
    @author Vincent
   */
  onRemovalConfirmed() {
    this.onDeleteEvt.emit(this.expenseToModify);
  }

  /** return the date form control */
  getDate() {
    return this.formGroup.controls[this.controlNames.date];
  }
  /** return the type form control */
  getType() {
    return this.formGroup.controls[this.controlNames.type];
  }
  /** return the cost form control */
  getCost() {
    return this.formGroup.controls[this.controlNames.cost];
  }
  /** return the tva form control */
  getTVA() {
    return this.formGroup.controls[this.controlNames.tva];
  }
  /**
  *  set form with validator
  *  and provided data
    this is made here instead of inside ngonInit()
    to avoid errors on non-initialized properties
   */
  initForm(expense: Expense): void {
    this.expenseToModify = expense;
    this.formGroup = this.formBuilder.group({
      dateControl: [this.tools.inputFormat(this.expenseToModify.date), [Validators.required, CustomValidators.dateBetweenValidator(this.mission.start, this.mission.end)]],
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

}
