import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateMissionComponent } from './create-mission/create-mission.component';
import { UpdateMissionComponent } from './update-mission/update-mission.component';
import { AllMissionsComponent } from './all-missions/all-missions.component';
import { RemoveMissionComponent } from './remove-mission/remove-mission.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    CreateMissionComponent,
    UpdateMissionComponent,
    AllMissionsComponent,
    RemoveMissionComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  exports:[CreateMissionComponent, UpdateMissionComponent, AllMissionsComponent]
})
export class MissionsModule { }
