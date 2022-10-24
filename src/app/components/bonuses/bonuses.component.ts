import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Mission } from 'src/app/model/mission';
import { ToolBox } from 'src/app/model/toolBox';
import { MissionsService } from 'src/app/service/missions.service';
import { ChartComponent } from './chart/chart.component';

@Component({
  selector: 'app-bonuses',
  templateUrl: './bonuses.component.html',
  styleUrls: ['./bonuses.component.css']
})
export class BonusesComponent implements OnInit {
  selectedCountriesControl = new FormControl();

  /** mission de l'utilisateur connecté */
  public missions: Mission[] = [];
  public displayedMissions: Mission[] = [];

  /** ici on créer une référence au composant enfant  d'édition d'un frais */
  @ViewChild(ChartComponent)
  private chart!: ChartComponent;

  /** années des missions de l'utilisateur connecté */
  public years: number[] = [];

  public selectedYear: number = new Date(Date.now()).getFullYear();
  /** boit à outils  */
  public tools: ToolBox = new ToolBox();

  constructor(private srvMission: MissionsService) {
    this.missions = this.srvMission.missions
    //this.years.push(this.selectedYear);

  }

  ngOnInit(): void {
    this.srvMission.getMissions().add(
      () => {
        this.missions = this.srvMission.missions
        this.missions.forEach(mission => {
          this.addtoYear(mission.start);
        });
        this.years.sort();

        //this.filterMission();
        this.displayedMissions = this.missions;
      }

    );

  }
  /**
   * check if the year of the given Date
  exist in the list
    if not, the year is added to the list
   * @param date
   */
  private addtoYear(date: Date): void {
    let exist: boolean = false;
    // we take the year
    let value = new Date(date).getFullYear();
    // then we search if it exist in the table
    this.years.forEach(element => {
      if (element == value)
        exist = true;
    });

    if (!exist) {
      this.years.push(value);
    }
  }
  /**
   * filter mission
  by selected year
   */
  public filterMission(): void {
    this.selectedYear = this.selectedCountriesControl.value;

    this.displayedMissions = this.missions.filter((mission) => {
      if (new Date(mission.start).getFullYear() == this.selectedYear) {
        return true;
      }
      return false;
    })
    this.chart.update(this.selectedYear);
  }

}
