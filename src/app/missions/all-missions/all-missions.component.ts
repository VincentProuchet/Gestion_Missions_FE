import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-all-missions',
  templateUrl: './all-missions.component.html',
  styleUrls: ['./all-missions.component.css']
})
export class AllMissionsComponent implements OnInit {

  missions: Array<any>

  constructor(private router: Router) {
    this.missions = [{
      startDate: formatDate(new Date(), 'yyyy-MM-dd', 'en'), // retrieve the locale of the user
      endDate: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
      nature: "",
      startCity: "test",
      endCity: "test",
      transport: "",
      status: "test",
      bonusEstimee: "test",
      id: 0
    }]
  }

  ngOnInit(): void {
  }

  onEdit(missionIndex: number) {
    console.log(missionIndex);
    this.router.navigate(['mission', this.missions[missionIndex].id])
  }

  onCreate(){
    this.router.navigate(['mission/new']);
  }
}
