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
    /*this.natures = [
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
    ];*/
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

  remove(nature: Nature): void {
    this.natures = this.natures.filter((n: Nature) => n !== nature);
  }

  onCreateNature() {
    this.router.navigate(['ajouteNatures']);
  }
  onModifierNature(id: number | null) {
    this.router.navigate(['modifierNatures', id]);
  }

  dateFormatted(date: Date | null) {
    if (date != null) {
      return this.datePipe.transform(date, this.dateFormat);
    }

    return '';
  }
}
