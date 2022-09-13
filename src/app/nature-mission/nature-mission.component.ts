import { DatePipe } from '@angular/common';
import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Nature } from '../model/nature';
import { MissionsService } from '../service/missions.service';
import { NaturesService } from '../service/natures.service';
import { TransportService } from '../service/transport.service';

@Component({
  selector: 'app-nature-mission',
  templateUrl: './nature-mission.component.html',
  styleUrls: ['./nature-mission.component.css'],
})
export class NatureMissionComponent implements OnInit {
  //public creationform: ReactiveFormsModule;
  public natures: Nature[] = new Array();
  private datePipe: DatePipe = new DatePipe(environment.dateLocale);
  private dateFormat: string = environment.dateFormat;

  constructor(private srvNature: NaturesService, private router: Router) {
    this.natures = [
      {
        id: 0,
        description: 'une Nature',
        dateOfValidity: new Date(Date.now()),
        endOfValidity: null,
        bonusPercentage: 2,
        givesBonus: true,
        charged: true,
        tjm: 250,
      },
    ];
  }

  ngOnInit(): void {
    this.refreshNatures();
  }
  /**
   *
   */
  refreshNatures() {
    this.srvNature.getNatures().subscribe({
      next: (data) => {
        this.natures = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  delete(nature: Nature) {
    this.srvNature.supprimerNature(nature).subscribe({
      next: () => {
        // mise à jour la liste locale
        this.natures.forEach((element: Nature, index: number) => {
          if (element.id == nature.id) {
            this.natures.splice(index, 1);
            console.log('suppresion', nature);
          }
        });
      },
      error: (err: any) => {
        console.log(err);
      },
    });
    this.refreshNatures();
  }
  update(nature: Nature) {
    this.srvNature.modifierNature(nature).subscribe({
      next: (data: Nature) => {
        console.log('Modification ok');
      },
      error: (error: any) => {
        console.log('erreur lors de la modification');
      },
    });
    this.refreshNatures();
  }
  creation(nature: Nature): void {
    this.srvNature.creationNature(nature);
    this.refreshNatures();
  }
  onCreateNature() {
    this.router.navigate(['ajouteNatures']);
  }
  onModifierNature() {
    this.router.navigate(['modifierNatures']);
  }
  onDeleteNature() {
    this.router.navigate(['supprimerNatures']);
  }

  dateFormatted(date: Date | null) {
    if (date != null) {
      return this.datePipe.transform(date, this.dateFormat);
    }

    return '';
  }
}
