import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Mission } from 'src/app/model/mission';
import { MissionsService } from 'src/app/service/missions.service';

@Component({
  selector: 'app-remove-mission',
  templateUrl: './remove-mission.component.html',
  styleUrls: ['./remove-mission.component.css']
})
export class RemoveMissionComponent implements OnInit {

  @Input() missionToDelete!: Mission;

  @Output() onDeleteEvt: EventEmitter<Mission> = new EventEmitter();

  constructor(private missionService: MissionsService) { }

  ngOnInit(): void { }

  onDeleteConfirmed() {
    this.missionService.deleteMission(this.missionToDelete).subscribe({
      next: () => {
        this.onDeleteEvt.emit(this.missionToDelete);
      },
      error: (err) => console.log(err)

    });
  }

}
