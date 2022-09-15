import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Nature } from 'src/app/model/nature';
import { NaturesService } from 'src/app/service/natures.service';

@Component({
  selector: 'app-delete-nature',
  templateUrl: './delete-nature.component.html',
  styleUrls: ['./delete-nature.component.css'],
})
export class DeleteNatureComponent implements OnInit {

  @Input() natureMissionToDelete!: Nature;

  @Output() onDeleteEvt: EventEmitter<Nature> = new EventEmitter;

  constructor(private natureService: NaturesService, private router: Router) {}

  ngOnInit(): void {}

  onDeleteConfirmed() {
    this.natureService
      .supprimerNature(this.natureMissionToDelete)
      .subscribe(() => {
      this.onDeleteEvt.emit(this.natureMissionToDelete);
    });
  }
}
