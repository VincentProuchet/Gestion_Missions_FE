import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllExpensesComponent } from './expenses/all-expenses/all-expenses.component';
import { ExpensesModule } from './expenses/expenses.module';
import { UpdateExpensesComponent } from './expenses/update-expenses/update-expenses.component';
import { LoginComponent } from './login/login.component';
import { AllMissionsComponent } from './missions/all-missions/all-missions.component';
import { CreateMissionComponent } from './missions/create-mission/create-mission.component';
import { UpdateMissionComponent } from './missions/update-mission/update-mission.component';
import { ValidationMissionComponent } from './missions/validation-mission/validation-mission.component';
import { ROLES } from './model/role';
import { CreationNatureComponent } from './nature-mission/creation-nature/creation-nature.component';
import { DeleteNatureComponent } from './nature-mission/delete-nature/delete-nature.component';
import { ModifyNatureComponent } from './nature-mission/modify-nature/modify-nature.component';
import { NatureMissionComponent } from './nature-mission/nature-mission.component';
import { NatureMissionModule } from './nature-mission/nature-mission.module';
import { AuthGuard } from './shared/guards/auth.guard';
import { BeforeAuthGuard } from './shared/guards/before-auth.guard';
import { RoleGuard } from './shared/guards/role.guard';

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
    //canActivate: [AuthGuard, RoleGuard],
    /*data: {
      roles: [
        ROLES.ADMINISTRATOR
      ]
    }*/
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
