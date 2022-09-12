import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-expenses',
  templateUrl: './all-expenses.component.html',
  styleUrls: ['./all-expenses.component.css']
})
export class AllExpensesComponent implements OnInit {

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
      id: 0,
      charges: 0
    }]
  }

  ngOnInit(): void {
  }

  onEdit(missionIndex: number) {
    console.log(missionIndex);
    this.router.navigate(['modifierFrais', this.missions[missionIndex].id])
  }

  onExport(missionIndex: number){
    //this.router.navigate(['mission/new']);
    console.log(missionIndex);
  }
}
