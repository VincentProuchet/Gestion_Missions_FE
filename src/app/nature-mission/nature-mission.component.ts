import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Nature } from '../model/nature';
import { MissionsService } from '../service/missions.service';
import { NaturesService } from '../service/natures.service';
import { TransportService } from '../service/transport.service';

@Component({
  selector: 'app-nature-mission',
  templateUrl: './nature-mission.component.html',
  styleUrls: ['./nature-mission.component.css']
})
export class NatureMissionComponent implements OnInit {

  //public creationform: ReactiveFormsModule;
  public natures: Nature[] = new Array();

  constructor(private srvNature: NaturesService, private router: Router) {
  }

  ngOnInit(): void {
    this.refreshNatures();
  }
  /**
   *
   */
  refreshNatures() {
    this.srvNature.getNatures().subscribe(
      {
        next: (data) => {
          this.natures = data;
        }
        ,
        error: (err) => {
          console.log(err);
        }
      }
    );
  }

  delete(nature: Nature) {
    this.srvNature.supprimerNature(nature)
      .subscribe(
        {
          next: () => {
            // mise à jour la liste locale
            this.natures.forEach((element: Nature, index: number) => {
              if (element.id == nature.id) {
                this.natures.splice(index, 1);
                console.log("suppresion", nature)
              }
            });
          }
          ,
          error: (err: any) => {
            console.log(err);
          }
        }
      )
    this.refreshNatures();
  }
  update(nature: Nature) {
    this.srvNature.modifierNature(nature)
      .subscribe(
        {
          next: (data: Nature) => {
            console.log("Modification ok");
          }
          ,
          error: (error: any) => {
            console.log("erreur lors de la modification");
          }
        }
      )
    this.refreshNatures();
  }
  creation(nature: Nature): void {
    this.srvNature.creationNature(nature);
    this.refreshNatures();
  }
  onCreateNature(){
    this.router.navigate(['ajouteNatures']);
  }

}
