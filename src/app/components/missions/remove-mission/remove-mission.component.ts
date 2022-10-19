import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToolBox } from 'src/app/model/toolBox';
import { Mission } from 'src/app/model/mission';
import { MissionsService } from 'src/app/service/missions.service';

@Component({
  selector: 'app-remove-mission',
  templateUrl: './remove-mission.component.html',
  styleUrls: ['./remove-mission.component.css']
})
/**
Compposant de suppression d'une mission
il est un composant subordonnée au
all-mission component et ne fonctionne que si ce dernier se trouve au dessus de lui
 */
export class RemoveMissionComponent implements OnInit {
  /**
  input venant du composant listant les mission
  référence à la mission dont la supression est demandée
   */
  @Input() missionToDelete!: Mission;
  /** event  de confirmation */
  @Output() confirmDeleteEvt: EventEmitter<Mission> = new EventEmitter();
  /** outils de formatage des dates */
  dates: ToolBox = new ToolBox();

  constructor() { }

  ngOnInit(): void { }

  /**
   * action de confirmation
  emet l'event de confimation de suppression 
   */
  onDeleteConfirmed() {
    this.confirmDeleteEvt.emit(this.missionToDelete);
  }

}