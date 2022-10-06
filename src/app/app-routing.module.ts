import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllExpensesComponent } from './components/expenses/all-expenses/all-expenses.component';

import { UpdateExpensesComponent } from './components/expenses/update-expenses/update-expenses.component';
import { LoginComponent } from './components/login/login.component';
import { AllMissionsComponent } from './components/missions/all-missions/all-missions.component';
import { CreateMissionComponent } from './components/missions/create-mission/create-mission.component';
import { UpdateMissionComponent } from './components/missions/update-mission/update-mission.component';
import { ValidationMissionComponent } from './components/missions/validation-mission/validation-mission.component';
import { CreationNatureComponent } from './components/nature-mission/creation-nature/creation-nature.component';
import { DeleteNatureComponent } from './components/nature-mission/delete-nature/delete-nature.component';
import { ModifyNatureComponent } from './components/nature-mission/modify-nature/modify-nature.component';
import { NatureMissionComponent } from './components/nature-mission/nature-mission.component';
import { ROLES } from './model/role';

import { AuthGuard } from './shared/guards/auth.guard';
import { BeforeAuthGuard } from './shared/guards/before-auth.guard';
import { RoleGuard } from './shared/guards/role.guard';
/**
 * 
 */
const routes: Routes = [
  {
    // Acceuil
    path: 'login',
    component: LoginComponent,
    canActivate: [BeforeAuthGuard]
  },

  {
    // page de gestion des mission
    // creation/modification/supression
    path: 'gestionMission',
    component: AllMissionsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'ajouterMission',
    component: CreateMissionComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'modifierMission/:id',
    component: UpdateMissionComponent,
    canActivate: [AuthGuard]
  },
  {
    // page de consultation du planning des missions
    path: 'planningMission',
    component: AllMissionsComponent,
    canActivate: [AuthGuard]
  },
  {
    // page de consultation des primes
    path: 'primes',
    component: AllMissionsComponent,
    canActivate: [AuthGuard]
  },
  {
    // page de saisie des frais
    path: 'saisieFrais',
    component: AllExpensesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'modifierFrais/:id',
    component: UpdateExpensesComponent,
    canActivate: [AuthGuard]
  },
  {
    // page de gestion des natures de missions
    path: 'gestionDesNatures',
    component: NatureMissionComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {
      roles: [
        ROLES.ADMINISTRATOR
      ]
    }
  },
  // page de gestion des natures de missions
  {
    path: 'ajouteNatures',
    component: CreationNatureComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {
      roles: [
        ROLES.ADMINISTRATOR
      ]
    }
  },
  {
    path: 'modifierNatures/:id',
    component: ModifyNatureComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {
      roles: [
        ROLES.ADMINISTRATOR
      ]
    }
  },
  {
    path: 'supprimerNatures',
    component: DeleteNatureComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {
      roles: [
        ROLES.ADMINISTRATOR
      ]
    }
  },
  {
    path: 'validationMission',
    component: ValidationMissionComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {
      roles: [
        ROLES.MANAGER
      ]
    }
  },
  {
    // Acceuil
    path: '',
    component: LoginComponent,
    canActivate: [BeforeAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
