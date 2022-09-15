import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllExpensesComponent } from './expenses/all-expenses/all-expenses.component';
import { ExpensesModule } from './expenses/expenses.module';
import { UpdateExpensesComponent } from './expenses/update-expenses/update-expenses.component';
import { LoginComponent } from './login/login.component';
import { AllMissionsComponent } from './missions/all-missions/all-missions.component';
import { CreateMissionComponent } from './missions/create-mission/create-mission.component';
import { UpdateMissionComponent } from './missions/update-mission/update-mission.component';
import { CreationNatureComponent } from './nature-mission/creation-nature/creation-nature.component';
import { DeleteNatureComponent } from './nature-mission/delete-nature/delete-nature.component';
import { ModifyNatureComponent } from './nature-mission/modify-nature/modify-nature.component';
import { NatureMissionComponent } from './nature-mission/nature-mission.component';
import { NatureMissionModule } from './nature-mission/nature-mission.module';

const routes: Routes = [
  {
    // Acceuil
    path: 'login',
    component: LoginComponent,
  },

  {
    // page de gestion des mission
    // creation/modification/supression
    path: 'gestionMission',
    component: AllMissionsComponent,
  },
  {
    path: 'ajouterMission',
    component: CreateMissionComponent,
  },
  {
    path: 'modifierMission/:id',
    component: UpdateMissionComponent,
  },
  {
    // page de consultation du planning des missions
    path: 'planningMission',
    component: AllMissionsComponent,
  },
  {
    // page de consultation des primes
    path: 'primes',
    component: AllMissionsComponent,
  },
  {
    // page de saisie des frais
    path: 'saisieFrais',
    component: AllExpensesComponent,
  },
  {
    path: 'modifierFrais/:id',
    component: UpdateExpensesComponent,
  },
  {
    // page de gestion des natures de missions
    path: 'gestionDesNatures',
    component: NatureMissionComponent,
  },
  // page de gestion des natures de missions
  {
    path: 'ajouteNatures',
    component: CreationNatureComponent,
  },
  {
    path: 'modifierNatures/:id',
    component: ModifyNatureComponent,
  },
  {
    path: 'supprimerNatures',
    component: DeleteNatureComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
