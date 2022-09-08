import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllMissionsComponentComponent } from './all-missions-component/all-missions-component.component';


@NgModule({
  declarations: [
    AllMissionsComponentComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[AllMissionsComponentComponent]
})
export class MissionsModule { }
