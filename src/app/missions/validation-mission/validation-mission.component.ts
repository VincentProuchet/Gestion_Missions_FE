import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Mission } from 'src/app/model/mission';
import { MissionsService } from 'src/app/service/missions.service';
import { TransportService } from 'src/app/service/transport.service';

@Component({
  selector: 'app-validation-mission',
  templateUrl: './validation-mission.component.html',
  styleUrls: ['./validation-mission.component.css']
})
export class ValidationMissionComponent implements OnInit {

  missions: Mission[] = [];

  constructor(private router: Router, private missionService: MissionsService, private transportService: TransportService) { }

  ngOnInit(): void {
    this.updateMission();
  }

  updateMission() {
    this.missionService.getMissions().subscribe({
      next: (data) => {
        this.missions = data;
      },
      error: (err) => console.log(err)
    });
  }

  getTransportValue(key: string): string {
    return this.transportService.getTransportValue(key);
  }

}
