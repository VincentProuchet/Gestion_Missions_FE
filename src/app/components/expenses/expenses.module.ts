import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllExpensesComponent } from './all-expenses/all-expenses.component';
import { UpdateExpensesComponent } from './update-expenses/update-expenses.component';
import { RemoveExpenseComponent } from './remove-expense/remove-expense.component';
import { CreateExpenseComponent } from './create-expense/create-expense.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModifyExpenseComponent } from './modify-expense/modify-expense.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    AllExpensesComponent,
    UpdateExpensesComponent,
    RemoveExpenseComponent,
    CreateExpenseComponent,
    ModifyExpenseComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  exports:[]
})
export class ExpensesModule { }
