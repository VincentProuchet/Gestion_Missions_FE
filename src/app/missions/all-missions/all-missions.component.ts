import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MissionsService } from 'src/app/service/missions.service';

@Component({
  selector: 'app-all-missions',
  templateUrl: './all-missions.component.html',
  styleUrls: ['./all-missions.component.css']
})
export class AllMissionsComponent implements OnInit {

  missions: Array<any>

  constructor(private router: Router, private srvMission: MissionsService) {
    this.missions = [{
      start: formatDate(new Date(), 'yyyy-MM-dd', 'en'), // retrieve the locale of the user
      end: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
      nature: "Commercial",
      startCity: "test",
      arrivalCity: "test",
      transport: "flyingBrooms",
      status: "test",
      bonusEstimee: 100,
      collaborator: 0,
      id: 0
    }]
  }

  ngOnInit(): void {
    this.updateMission();
  }
  updateMission() {
    this.srvMission.getMissions().subscribe(
      {
        next: (data) => { this.missions = data; }
        , error: (err) => { console.log(err); }
      }
    )

  }

  onEdit(missionIndex: number) {
    console.log(missionIndex);
    this.router.navigate(['modifierMission', this.missions[missionIndex].id])
  }

  onCreate() {
    this.router.navigate(['ajouterMission']);
  }
}
