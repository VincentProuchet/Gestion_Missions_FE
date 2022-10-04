import { Component, OnInit } from '@angular/core';
import { ToolBox } from 'src/app/model/ToolBox';
import { Mission } from 'src/app/model/mission';

@Component({
  selector: 'app-confirm-action',
  templateUrl: './confirm-action.component.html',
  styleUrls: ['./confirm-action.component.css']
})
export class ConfirmActionComponent implements OnInit {

  mission !: Mission;
  date: ToolBox = new ToolBox();
  constructor() { }

  ngOnInit(): void {
  }
  onValidate(mission: Mission) {

  }

  onReject(mission: Mission) {

  }

  onReset(mission: Mission) {

  }
}
