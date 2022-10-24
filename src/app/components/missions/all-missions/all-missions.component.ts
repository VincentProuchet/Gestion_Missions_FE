import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import * as Notiflix from 'notiflix';

import { Mission } from 'src/app/model/mission';
import { Status } from 'src/app/model/status';
import { ToolBox } from 'src/app/model/toolBox';
import { Transport } from 'src/app/model/transport';
import { MissionsService } from 'src/app/service/missions.service';
import { TransportService } from 'src/app/service/transport.service';

@Component({
  selector: 'app-all-missions',
  templateUrl: './all-missions.component.html',
  styleUrls: ['./all-missions.component.css']
})
/**
 * composant affichant la liste des mission de l'employé
  normalement seules les missions n'ayant pas le statuc waiting_validation s'affichent
 */
export class AllMissionsComponent implements OnInit {

  /** tableau des mission de l'utilisateur
   */
  missions: Array<Mission> = [];
  /** boite à outils  */
  tools: ToolBox = new ToolBox();
  /** enumération des status */
  statusEnum: typeof Status = Status;
  /** référence à l'instance de mission à supprimer
      celle-ci est passé au composant remove pour qu'il puisse afficher les détails et
      emettre l'événement
  */
  missionToDelete !: Mission;



  constructor(private router: Router, private srvMission: MissionsService, private srvTransport: TransportService) { }

  ngOnInit(): void {
    this.getMission();
  }

  /**
  * Met à jour la liste des missions
  */
  getMission() {
    this.missions = this.srvMission.missions;
    this.srvMission.getMissions().add(
      () => { this.missions = this.srvMission.missions; });
  }
  /**
   * ouvre le formulaire de modification d'édition d'une mission
   * @param missionIndex
   */
  onEdit(mission: Mission) {
    this.router.navigate(['modifierMission', mission.id])
  }
  /**
   * ouvre le formulaire de création de mission
   */
  onCreate() {
    this.router.navigate(['ajouterMission']);
  }
  /**
   * execute une requête de supression d'une mission au service des mission
  la réussite de la requête entrainera une mise à jour de la liste de manière locale pour réduire la consommation
  de resources réseaux
  l'echec provoqueras l'affichage d'une notification avec le message d'erreur provenant du back-end
   * @param mission à supprimer
   */
  onDelete(mission: Mission): void {
    this.srvMission.deleteMission(mission).add(
      () => {
        // mise à jour de la liste
        this.missions = this.missions.filter((m: Mission) => m !== mission)
      }
    );

  }
  /**
   * place une référence de la mission passée en paramètre dans la proprièté missionToDelete
   * @param mission
   */
  confirmDelete(mission: Mission) {
    this.missionToDelete = mission;
  }

  /**
   * filtre les missions
  seulement celles qui n'ont pas plus de six mois
  trié par année
  puis par mois
   * @param missions
   * @returns
   */
  filter(missions: Mission[]): Mission[] {
    let now: Date = new Date(Date.now());
    now.setMonth(now.getMonth() - 6);
    return missions.filter((m) => {
      return ((now.getTime() < new Date(m.start).getTime()));
    }).sort((a: Mission, b: Mission) => {
      let c = new Date(a.start)
      let d = new Date(b.start)
      return d.getFullYear() - c.getFullYear();
    }).sort((a: Mission, b: Mission) => {
      let c = new Date(a.start)
      let d = new Date(b.start)
      return d.getMonth() - c.getMonth();
    })
  }
}
