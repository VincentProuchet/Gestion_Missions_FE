import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllMissionsComponentComponent } from './all-missions-component/all-missions-component.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateMissionComponent } from './create-mission/create-mission.component';
import { UpdateMissionComponent } from './update-mission/update-mission.component';


@NgModule({
  declarations: [
    AllMissionsComponentComponent,
    CreateMissionComponent,
    UpdateMissionComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports:[AllMissionsComponentComponent, CreateMissionComponent, UpdateMissionComponent]
})
export class MissionsModule { }
