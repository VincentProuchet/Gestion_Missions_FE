import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import * as Notiflix from 'notiflix';
import { DateTools } from 'src/app/model/date-tools';
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
 * composant affichant la liste des mission de l'employé
  normalement seules les missions n'ayant pas le statuc waiting_validation s'affichent
 */
export class AllMissionsComponent implements OnInit {

  missions: Array<Mission> = [];
  dates: DateTools = new DateTools();
  statusEnum: typeof Status = Status;
  missionToDelete !: Mission;



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
    console.log("confirm delete event received");

    this.srvMission.deleteMission(mission).subscribe({
      next: () => {
        this.missions = this.missions.filter((m: Mission) => m !== mission);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err)
        Notiflix.Notify.failure(err.error);
      }
    });

  }
  /**
   * place une référence de la mission passée en paramètre dans la proprièté missionToDelete
   * @param mission
   */
  confirmDelete(mission: Mission) {
    this.missionToDelete = mission;
  }
  /**
   * permet d'obtenir
  la valeur de transport depuis la cléf
  à refactorer pour en premetre un accés plus universel
   * @param key
   * @returns
   */
  getTransportValue(key: string): string {
    return this.srvTransport.getTransportValue(key);
  }

}
