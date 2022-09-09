import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MissionsModule } from './missions/missions.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NatureMissionModule } from './nature-mission/nature-mission.module';
import { ExpensesModule } from './expenses/expenses.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    MissionsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NatureMissionModule,
    ExpensesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
