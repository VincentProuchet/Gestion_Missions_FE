
import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { Router } from '@angular/router';



import { Notify } from "notiflix";
import { HttpErrorResponse } from '@angular/common/http';
import { Nature } from 'src/app/model/nature';
import { ToolBox } from 'src/app/model/toolBox';
import { NaturesService } from 'src/app/service/natures.service';
import * as Notiflix from 'notiflix';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { Subscription } from 'rxjs';
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

  constructor(private srvNature: NaturesService, private router: Router, private srvAuth: AuthenticationService) {
    srvAuth.setNotiflix();
  }

  ngOnInit(): void {
    this.refreshNatures();
  }
  /**
   * this fetch natures from back-end to populate componenet  list
   */
  refreshNatures() {
    this.srvNature.refreshNatures().add(
      () => {
        this.natures = this.srvNature.natures;
      }
    )
  }
  /**
   * this send a demand to back end for removing
  a nature's mission
   * @param nature
   */
  deleteNature(nature: Nature): void {
    this.srvNature.supprimerNature(nature).add(
      () => {
        this.refreshNatures();
      }
    );
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
