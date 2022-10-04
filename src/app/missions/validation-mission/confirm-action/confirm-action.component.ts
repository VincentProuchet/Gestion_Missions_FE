import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToolBox } from 'src/app/model/ToolBox';
import { Mission } from 'src/app/model/mission';
import { Action } from 'rxjs/internal/scheduler/Action';
import { Actions } from 'src/app/model/actions';

@Component({
  selector: 'app-confirm-action',
  templateUrl: './confirm-action.component.html',
  styleUrls: ['./confirm-action.component.css']
})
/**
    composant pour la confirmation d'une action sur les status des missions
    il doit pouvoir traiter la validation, le reset et la supression

    pour le moment il contient trois modals
    un pour chaque action mais les propriétées sont communes

    il posséde un événement par action
 */
export class ConfirmActionComponent implements OnInit {
  /** mission concernée par l'action */
  @Input() mission !: Mission;
  /** boite à outils des composants */
  tools: ToolBox = new ToolBox();
  /**
      action à réaliser par le composant
      détermineras le bouton visible sur l'interface
  */
  @Input() action: Actions = Actions.validate;
  /** reject mission event to emit */
  @Output() onRejectEvt: EventEmitter<Mission> = new EventEmitter();
  /** reset mission event to emit */
  @Output() onResetEvt: EventEmitter<Mission> = new EventEmitter();
  /** validate mission event to emit */
  @Output() onValidateEvt: EventEmitter<Mission> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
  /** on validate */
  onValidate(mission: Mission) {
    this.onValidate(mission);
  }

  /** on reject */
  onReject(mission: Mission) {
    this.onReject(mission);
  }
  /** on reset */
  onReset(mission: Mission) {
    this.onReset(mission);
  }
}
