import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MissionsModule } from './missions/missions.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NatureMissionModule } from './nature-mission/nature-mission.module';
import { MissionsService } from './service/missions.service';
import { HttpClientModule } from '@angular/common/http';
import { NaturesService } from './service/natures.service';
import { CollaboratorService } from './service/collaborator.service';
import { ExpensesService } from './service/expenses.service';
import { CityService } from './service/city.service';
import { TransportService } from './service/transport.service';
import { ExpensesModule } from './expenses/expenses.module';
import { AuthMaskComponent } from './shared/auth-mask/auth-mask.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AuthMaskComponent
  ],
  imports: [
    BrowserModule,
    MissionsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NatureMissionModule,
    HttpClientModule,
    ExpensesModule,
    FontAwesomeModule
  ],
  providers: [
    CityService,
    CollaboratorService,
    ExpensesService,
    MissionsService,
    NaturesService,
    TransportService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
