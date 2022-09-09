import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllExpensesComponent } from './expenses/all-expenses/all-expenses.component';
import { ChargesComponent } from './expenses/charges/charges.component';
import { LoginComponent } from './login/login.component';
import { AllMissionsComponent } from './missions/all-missions/all-missions.component';
import { CreateMissionComponent } from './missions/create-mission/create-mission.component';
import { UpdateMissionComponent } from './missions/update-mission/update-mission.component';
import { AddNatureComponent } from './nature-mission/add-nature/add-nature.component';
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
    path: 'addNatureMission',
    component: AddNatureComponent,
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
  },
  {
    path: 'expenses/:missionID',
    component: ChargesComponent,
  },
  {
    path: 'expenses',
    component: AllExpensesComponent,
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
