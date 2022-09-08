import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MissionsModule } from './missions/missions.module';
import { GestionMissionsComponent } from './gestion-missions/gestion-missions.component';
import { DemanderMissionComponent } from './demander-mission/demander-mission.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GestionMissionsComponent,
    DemanderMissionComponent
  ],
  imports: [
    BrowserModule,
    MissionsModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
