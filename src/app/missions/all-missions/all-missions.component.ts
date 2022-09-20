import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Mission } from 'src/app/model/mission';
import { Status } from 'src/app/model/status';
import { Transport } from 'src/app/model/transport';
import { MissionsService } from 'src/app/service/missions.service';
import { TransportService } from 'src/app/service/transport.service';

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

  constructor(private router: Router, private srvMission: MissionsService, private srvTransport: TransportService) { }

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
    this.router.navigate(['modifierMission', this.missions[missionIndex].id])
  }
  /**
   * ouvre le formulaire de création de mission
   */
  onCreate() {
    this.router.navigate(['ajouterMission']);
  }

  onDelete(mission: Mission) {
    console.log("OO");

    this.missions = this.missions.filter((m: Mission) => m !== mission);
  }

  getTransportValue(key: string): string {
    return this.srvTransport.getTransportValue(key);
  }

}
