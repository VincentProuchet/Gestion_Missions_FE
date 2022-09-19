import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CreationNatureComponent } from './creation-nature/creation-nature.component';
import { ModifyNatureComponent } from './modify-nature/modify-nature.component';
import { NatureMissionComponent } from './nature-mission.component';
import { DeleteNatureComponent } from './delete-nature/delete-nature.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



@NgModule({
  declarations: [
    CreationNatureComponent,
    ModifyNatureComponent,
    NatureMissionComponent,
    CreationNatureComponent,
    DeleteNatureComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  exports: [
    CreationNatureComponent,
    ModifyNatureComponent,
    NatureMissionComponent,
    CreationNatureComponent,
    DeleteNatureComponent

  ]
})
export class NatureMissionModule {


}
