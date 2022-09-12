import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CreationNatureComponent } from './creation-nature/creation-nature.component';
import { ModifyNatureComponent } from './modify-nature/modify-nature.component';
import { NatureMissionComponent } from './nature-mission.component';



@NgModule({
  declarations: [
    CreationNatureComponent,
    ModifyNatureComponent,
    NatureMissionComponent,
    CreationNatureComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    CreationNatureComponent,
    ModifyNatureComponent,
    NatureMissionComponent,
    CreationNatureComponent

  ]
})
export class NatureMissionModule {


}
