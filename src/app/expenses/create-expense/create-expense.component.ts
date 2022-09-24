import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Mission } from 'src/app/model/mission';
import { ExpenseType } from 'src/app/model/expense-type';
import { ExpensesService } from 'src/app/service/expenses.service';
import { NaturesService } from 'src/app/service/natures.service';
import { CustomValidators } from 'src/app/shared/custom-validators';
import { Expense } from 'src/app/model/expense';
import { DateTools } from 'src/app/model/date-tools';

@Component({
  selector: 'app-create-expense',
  templateUrl: './create-expense.component.html',
  styleUrls: ['./create-expense.component.css']
})
export class CreateExpenseComponent implements OnInit {

  formGroup !: FormGroup;
  dates: DateTools = new DateTools();

  @Input() mission !: Mission;
  types!: ExpenseType[];
  @Output() onCreateEvt: EventEmitter<Expense> = new EventEmitter();

  constructor(private formBuilder: FormBuilder, private expensesService: ExpensesService, private naturesService: NaturesService) {
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      dateControl: ['', [Validators.required, CustomValidators.dateBetweenValidator(this.mission.start, this.mission.end)]],
      typeControl: ['', Validators.required],
      costControl: [0, [Validators.required, Validators.min(0), Validators.pattern("^[0-9]+(.[0-9])?[0-9]*$")]]
    })

    this.expensesService.getExpenseTypes().subscribe(types => this.types = types);


  }
  /**
   * on Submit of form
   * @returns
   */
  onCreate() {
    //register the new expense here
    if (this.formGroup.invalid) {
      return;
    }
    let newExpense: Expense = {
      date: new Date(this.formGroup.controls['dateControl'].value),
      type: this.types[this.formGroup.controls['typeControl'].value],
      cost: this.formGroup.controls['costControl'].value,
      id: 0,
      idMission: this.mission.id,
      tva: 0
    }
    this.expensesService.addExpense(newExpense).subscribe((expense) => {
      this.onCreateEvt.emit(expense);
      this.formGroup.reset();
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

}
