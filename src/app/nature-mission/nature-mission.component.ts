import { Component, OnInit } from '@angular/core';
import { Nature } from '../model/nature';
import { MissionsService } from '../service/missions.service';
import { NaturesService } from '../service/natures.service';
import { TransportService } from '../service/transport.service';

@Component({
  selector: 'app-nature-mission',
  templateUrl: './nature-mission.component.html',
  styleUrls: ['./nature-mission.component.css']
})
export class NatureMissionComponent implements OnInit {

  public natures: Nature[] = new Array<Nature>()

  constructor(private srvNature: NaturesService) { }

  ngOnInit(): void {
    this.refreshNatures();
  }

  refreshNatures() {
    this.natures = this.srvNature.getNatures();
  }

  delete(nature: Nature) {

  }
  update(nature: Nature) {

  }

}
