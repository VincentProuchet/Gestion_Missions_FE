import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { GestionMissionsComponent } from './gestion-missions/gestion-missions.component';
import { DemanderMissionComponent } from './demander-mission/demander-mission.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    GestionMissionsComponent,
    DemanderMissionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
