import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-missions',
  templateUrl: './all-missions.component.html',
  styleUrls: ['./all-missions.component.css']
})
export class AllMissionsComponent implements OnInit {
  missions:Array<any>

  constructor() {
    this.missions = [{
      startDate: formatDate(new Date(), 'yyyy-MM-dd', 'en'), // retrieve the locale of the user
      endDate: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
      nature: "",
      startCity: "test",
      endCity: "test",
      transport: "",
      status : "test",
      bonusEstimee: "test"
    }]
  }

  ngOnInit(): void {
  }
}
