import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Mission } from 'src/app/model/mission';
import { ExpenseType } from 'src/app/model/expense-type';
import { ExpensesService } from 'src/app/service/expenses.service';

import { CustomValidators } from 'src/app/model/custom-validators';
import { Expense } from 'src/app/model/expense';
import { ToolBox } from 'src/app/model/toolBox';
import { API_FormControlNames } from 'src/environments/API_FormControlNames';


@Component({
  selector: 'app-create-expense',
  templateUrl: './create-expense.component.html',
  styleUrls: ['./create-expense.component.css']
})
export class CreateExpenseComponent implements OnInit {
  /** toolbox */
  tools: ToolBox = new ToolBox();
  /** control names
  this little object bear the names used in the template's formcontrols
   */
  controlNames = API_FormControlNames;
  //** mission to add expense */
  @Input() mission !: Mission;
  /** expenses type list */
  types!: ExpenseType[];
  /** event emited  */
  @Output() onCreateEvt: EventEmitter<Expense> = new EventEmitter();
  /** form group */
  formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder, private expensesService: ExpensesService) {
    this.expensesService.getExpenseTypes().add(
      () => { this.types = this.expensesService.types });
  }
  /**
   * automatically called angular function
   */
  ngOnInit(): void {
    this.initForm(this.mission);
  }
  /**
   * on Submit of form to the service
   * @returns
   */
  onCreate() {
    if (!this.formGroup.invalid) {
      this.onCreateEvt.emit(this.collectForm());
    }
  }
  /** return date of the formcontrolgroup */
  getDate() {
    return this.formGroup.controls[this.controlNames.date];
  }
  /** return type of the formcontrolgroup */
  getType() {
    return this.formGroup.controls[this.controlNames.type];
  }
  /** return cost of the formcontrolgroup */
  getCost() {
    return this.formGroup.controls[this.controlNames.cost];
  }
  /** return TVA of the formcontrolgroup */
  getTVA() {
    return this.formGroup.controls[this.controlNames.tva];
  }
  /**
    return all data of the formgroup
    in a convenient Expense
   */
  collectForm(): Expense {
    return {
      id: 0,
      date: new Date(this.formGroup.controls[this.controlNames.date].value),
      type: {
        id: this.formGroup.controls[this.controlNames.type].value.id,
        name: this.formGroup.controls[this.controlNames.type].value.name
      },
      cost: this.formGroup.controls[this.controlNames.cost].value,
      idMission: this.mission.id,
      tva: this.formGroup.controls[this.controlNames.tva].value
    }
  }
  /**
   * initialise the form mith values
   * @param mission to associate to the new expense
   */
  initForm(mission: Mission): void {
    this.mission = mission;
    this.formGroup = this.formBuilder.group({
      dateControl: [this.tools.inputFormat(this.mission.start), [Validators.required, CustomValidators.dateBetweenValidator(this.mission.start, this.mission.end)]],
      typeControl: ['', Validators.required],
      tvaControl: [5, [Validators.required, Validators.min(0), Validators.max(100), Validators.pattern("^[0-9]+(.[0-9])?[0-9]*$")]],
      costControl: [0, [Validators.required, Validators.min(0), Validators.pattern("^[0-9]+(.[0-9])?[0-9]*$")]],
    });
  }

}
