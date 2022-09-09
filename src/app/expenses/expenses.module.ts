import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllExpensesComponent } from './all-expenses/all-expenses.component';
import { ChargesComponent } from './charges/charges.component';



@NgModule({
  declarations: [
    AllExpensesComponent,
    ChargesComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ExpensesModule { }
