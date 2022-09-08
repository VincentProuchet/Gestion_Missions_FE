import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllMissionsComponentComponent } from './all-missions-component/all-missions-component.component';
import { CreateUpdateMissionComponent } from './create-update-mission/create-update-mission.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AllMissionsComponentComponent,
    CreateUpdateMissionComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports:[AllMissionsComponentComponent, CreateUpdateMissionComponent]
})
export class MissionsModule { }
