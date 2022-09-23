import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { DateTools } from 'src/app/model/date-tools';
import { Mission } from 'src/app/model/mission';
import { Status } from 'src/app/model/status';
import { MissionsService } from 'src/app/service/missions.service';
import { TransportService } from 'src/app/service/transport.service';

@Component({
  selector: 'app-validation-mission',
  templateUrl: './validation-mission.component.html',
  styleUrls: ['./validation-mission.component.css']
})
export class ValidationMissionComponent implements OnInit {

  missions: Mission[] = [];
  statusEnum: typeof Status = Status;
  dates: DateTools = new DateTools();

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

  onValidate(mission: Mission) {
    //TODO: retirer ligne suivante une fois relié au back end
    //mission.status = this.statusEnum.VALIDATED;

    this.missionService.validateMission(mission).subscribe({
      next: (data) => {
        let idx = this.missions.indexOf(mission);
        this.missions[idx] = data;
      },
      error: (err) => console.log(err)
    })
  }

  onReject(mission: Mission) {
    //TODO: retirer ligne suivante une fois relié au back end
    //mission.status = this.statusEnum.REJECTED;

    this.missionService.rejectMission(mission).subscribe({
      next: (data) => {
        let idx = this.missions.indexOf(mission);
        this.missions[idx] = data;
      },
      error: (err) => console.log(err)
    })
  }

  onReset(mission: Mission) {
    //TODO: retirer ligne suivante une fois relié au back end
    //mission.status = this.statusEnum.WAITING_VALIDATION;

    this.missionService.resetMission(mission).subscribe({
      next: (data) => {
        let idx = this.missions.indexOf(mission);
        this.missions[idx] = data;
      },
      error: (err) => console.log(err)
    })
  }

  getStatusColor(status: Status): string {
    let bsClass = "";
    switch (status) {
      case 1:
        bsClass = "text-success";
        break;
      case 2:
        bsClass = "text-danger";
        break;
      case 3:
        bsClass = "text-primary";
        break;
      default:
        break;
    }
    return bsClass;
  }

  getTransportValue(key: string): string {
    return this.transportService.getTransportValue(key);
  }

}
