import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Nature } from 'src/app/model/nature';
import { NaturesService } from 'src/app/service/natures.service';
import { Notify } from "notiflix";
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-delete-nature',
  templateUrl: './delete-nature.component.html',
  styleUrls: ['./delete-nature.component.css'],
})
/**
component for nauture deletion
its a button for the base form
and confirmation modal that appear with a confirm/cancel choice
 */
export class DeleteNatureComponent implements OnInit {
  /**
    nature to delete passed by an event
   */
  @Input() natureMissionToDelete!: Nature;
  /**
  event emmitter
   */
  @Output() onDeleteEvt: EventEmitter<Nature> = new EventEmitter();

  constructor(private natureService: NaturesService, private router: Router) { }

  ngOnInit(): void { }
  /**
   * delete action of the form
   * will ask the service to delete a nature
   */
  onDeleteConfirmed(): void {
    this.onDeleteEvt.emit(this.natureMissionToDelete)

  }
}
