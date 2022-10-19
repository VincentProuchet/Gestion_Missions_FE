import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AuthMaskComponent } from './shared/auth-mask/auth-mask.component';
import { CityService } from './service/city.service';
import { NaturesService } from './service/natures.service';
import { ExpensesService } from './service/expenses.service';
import { MissionsService } from './service/missions.service';
import { TransportService } from './service/transport.service';
import { CollaboratorService } from './service/collaborator.service';
import { LoginComponent } from './components/login/login.component';
import { MissionsModule } from './components/missions/missions.module';
import { ExpensesModule } from './components/expenses/expenses.module';
import { NatureMissionModule } from './components/nature-mission/nature-mission.module';
import { NavigationComponent } from './shared/guards/navigation/navigation.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AuthMaskComponent,
    NavigationComponent,



  ],
  imports: [
    BrowserModule,
    MissionsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NatureMissionModule,
    HttpClientModule,
    ExpensesModule,
    FontAwesomeModule,

  ],
  providers: [
    CityService,
    CollaboratorService,
    ExpensesService,
    MissionsService,
    NaturesService,
    TransportService,
    CookieService,

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
