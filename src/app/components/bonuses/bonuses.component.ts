import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Mission } from 'src/app/model/mission';
import { ToolBox } from 'src/app/model/toolBox';
import { MissionsService } from 'src/app/service/missions.service';

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

  /** années des missions de l'utilisateur connecté */
  public years: number[] = [];

  public selectedYear: number = new Date(Date.now()).getFullYear();
  /** boit à outils  */
  public tools: ToolBox = new ToolBox();

  constructor(private srvMission: MissionsService) {
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
  if not the year
  is added to the list
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
  public filterMission(): void {
    this.selectedYear = this.selectedCountriesControl.value;
    console.log(this.selectedYear);
    this.displayedMissions = this.missions.filter((mission) => {
      if (new Date(mission.start).getFullYear() == this.selectedYear) {
        return true;
      }
      return false;
    })
  }

  compareFn(c1: number, c2: number): boolean {
    return c1 && c2 ? c1 == c2 : c1 == c2;
  }

}
