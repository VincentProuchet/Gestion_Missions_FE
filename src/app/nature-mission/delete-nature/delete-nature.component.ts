import { Component, Input, OnInit } from '@angular/core';
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

  constructor(private natureService: NaturesService, private router: Router) {}

  ngOnInit(): void {}

  onDeleteConfirmed() {
    this.natureService
      .supprimerNature(this.natureMissionToDelete)
      .subscribe(() => console.log('removed : ' +  this.natureMissionToDelete.id));
  }
}
