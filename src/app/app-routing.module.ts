import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AllMissionsComponent } from './missions/all-missions/all-missions.component';
import { CreateMissionComponent } from './missions/create-mission/create-mission.component';
import { UpdateMissionComponent } from './missions/update-mission/update-mission.component';
import { CreationNatureComponent } from './nature-mission/creation-nature/creation-nature.component';
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
    component: AllMissionsComponent,
  },
  {
    // page de gestion des natures de missions
    path: 'gestionDesNatures',
    component: NatureMissionComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
