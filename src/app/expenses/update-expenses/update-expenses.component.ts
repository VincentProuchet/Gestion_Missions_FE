import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-expenses',
  templateUrl: './update-expenses.component.html',
  styleUrls: ['./update-expenses.component.css']
})
export class UpdateExpensesComponent implements OnInit {

  mission: any;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {

      console.log("mission id received : " + params["missionID"]);

      this.mission = {
        startDate: formatDate(new Date(), 'yyyy-MM-dd', 'en'), // retrieve the locale of the user
        endDate: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
        nature: "",
        startCity: "test",
        endCity: "test",
        transport: "",
        bonusEstimee: "test",
        expenses: [
          {
            date: formatDate(new Date(), 'yyyy-MM-dd', 'en'),
            expenseType: "testnat",
            value: "0",
          }
        ]
      }
    })//get the mission with given id
  }

  onEdit(expenseIndex: number) { }
  onAdd() { }

}