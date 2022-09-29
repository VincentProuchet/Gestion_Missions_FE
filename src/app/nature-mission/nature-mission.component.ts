import { DatePipe } from '@angular/common';
import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AP_Vars } from 'src/environments/API_Vars';
import { environment } from 'src/environments/environment';
import { DateTools } from '../model/date-tools';
import { Nature } from '../model/nature';
import { MissionsService } from '../service/missions.service';
import { NaturesService } from '../service/natures.service';
import { TransportService } from '../service/transport.service';
import { Notify } from "notiflix";
@Component({
  selector: 'app-nature-mission',
  templateUrl: './nature-mission.component.html',
  styleUrls: ['./nature-mission.component.css'],
})
export class NatureMissionComponent implements OnInit {
  //public creationform: ReactiveFormsModule;
  public natures: Nature[] = new Array();
  // il nous faut une instance de DateTools pour que le HTML puisse s'en servir
  public dates: DateTools = new DateTools();
  private datePipe: DatePipe = new DatePipe(AP_Vars.dateLocale);
  private dateFormat: string = AP_Vars.dateFormat;

  constructor(private srvNature: NaturesService, private router: Router) {
  }

  ngOnInit(): void {
    this.refreshNatures();
  }
  /**
   *
   */
  refreshNatures() {
    this.srvNature.getNatures().subscribe({
      next: (data) => {
        this.natures = data;
      },
      error: (err) => {
        Notify.failure(err);
        console.log(err);
      },
    });
  }
  /**
   * Remove event for deleting nature
   * @param nature
   */
  remove(nature: Nature): void {
    this.natures = this.natures.filter((n: Nature) => n !== nature);
  }
  /**
   * rerouting to creation-nature formular
   */
  onCreateNature() {
    this.router.navigate(['ajouteNatures']);
  }
  /**
   * rerouting for modifying-nature formular
   * @param id
   */
  onModifierNature(id: number | null) {
    this.router.navigate(['modifierNatures', id]);
  }

}
