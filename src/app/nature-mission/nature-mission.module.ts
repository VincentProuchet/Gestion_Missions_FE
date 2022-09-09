import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreationNatureComponent } from './creation-nature/creation-nature.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModifyNatureComponent } from './modify-nature/modify-nature.component';



@NgModule({
  declarations: [
    CreationNatureComponent,
    ModifyNatureComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    CreationNatureComponent,
    ModifyNatureComponent
  ]
})
export class NatureMissionModule { }
