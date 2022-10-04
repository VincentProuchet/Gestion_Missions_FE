import { DatePipe } from '@angular/common';
import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AP_Vars } from 'src/environments/API_Vars';
import { environment } from 'src/environments/environment';
import { ToolBox } from '../model/ToolBox';
import { Nature } from '../model/nature';
import { MissionsService } from '../service/missions.service';
import { NaturesService } from '../service/natures.service';
import { TransportService } from '../service/transport.service';
import { Notify } from "notiflix";
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-nature-mission',
  templateUrl: './nature-mission.component.html',
  styleUrls: ['./nature-mission.component.css'],
})
/**
componenet for mission's natrures management
here you can control/create/modify/ delete natures
all controls for respecting work rules are made by the back-end
who respond by http errors when rules aren't respected
 */
export class NatureMissionComponent implements OnInit {
  //public creationform: ReactiveFormsModule;
  public natures: Nature[] = new Array();
  // il nous faut une instance de DateTools pour que le HTML puisse s'en servir
  dates: ToolBox = new ToolBox();
  /** referenc to a nature to delete */
  public natureToDelete!: Nature;

  constructor(private srvNature: NaturesService, private router: Router) {
  }

  ngOnInit(): void {
    this.refreshNatures();
  }
  /**
   * this fetch natures from back-end to populate componenet  list
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
   * this send a demand to back end for removing
  a nature's mission
   * @param nature
   */
  deleteNature(nature: Nature): void {
    this.srvNature
      .supprimerNature(nature)
      .subscribe({
        next: () => {
          this.natures = this.natures.filter((n: Nature) => n !== nature);
        }
        , error: (err: HttpErrorResponse) => {
          Notify.failure(err.error.message);
        }
      });
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
  /**
   * action de supression d'une nature
   * @param nature
   */
  onDeletePrompt(nature: Nature): void {
    this.natureToDelete = nature;
  }

}
