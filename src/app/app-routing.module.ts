import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AllMissionsComponent } from './missions/all-missions/all-missions.component';
import { CreateMissionComponent } from './missions/create-mission/create-mission.component';
import { UpdateMissionComponent } from './missions/update-mission/update-mission.component';
import { CreationNatureComponent } from './nature-mission/creation-nature/creation-nature.component';
import { NatureMissionModule } from './nature-mission/nature-mission.module';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'natureMission',
    component: CreationNatureComponent,
  },
  {
    path: 'mission/new',
    component: CreateMissionComponent,
  },
  {
    path: 'mission/:id',
    component: UpdateMissionComponent,
  },
  {
    path: 'mission',
    component: AllMissionsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
