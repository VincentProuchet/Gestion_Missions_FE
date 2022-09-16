import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Mission } from 'src/app/model/mission';
import { Status } from 'src/app/model/status';
import { Transport } from 'src/app/model/transport';
import { MissionsService } from 'src/app/service/missions.service';

@Component({
  selector: 'app-all-missions',
  templateUrl: './all-missions.component.html',
  styleUrls: ['./all-missions.component.css']
})
/**
 *
 */
export class AllMissionsComponent implements OnInit {

  missions: Array<Mission> = [];
  statusEnum: typeof Status = Status;
  transportEnum = Transport;

  constructor(private router: Router, private srvMission: MissionsService) { }

  ngOnInit(): void {
    this.updateMission();
  }

  /**
   * Met à jour la liste des missions
   */
  updateMission() {
    this.srvMission.getMissions().subscribe(
      {
        next: (data) => { this.missions = data; }
        , error: (err) => { console.log(err); }
      }
    )

  }
  /**
   * ouvre le formulaire de modification d'édition d'une mission
   * @param missionIndex
   */
  onEdit(missionIndex: number) {
    console.log(missionIndex);
    this.router.navigate(['modifierMission', this.missions[missionIndex].id])
  }
  /**
   * ouvre le formulaire de création de mission
   */
  onCreate() {
    this.router.navigate(['ajouterMission']);
  }

  getTransportValue(key: string): string {
    return this.transportEnum[key as keyof typeof this.transportEnum];
  }

}
