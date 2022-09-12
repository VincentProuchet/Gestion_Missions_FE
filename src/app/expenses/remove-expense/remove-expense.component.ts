import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-remove-expense',
  templateUrl: './remove-expense.component.html',
  styleUrls: ['./remove-expense.component.css']
})
export class RemoveExpenseComponent implements OnInit {

  @Input() expenseToRemove : any = {};

  constructor() { }

  ngOnInit(): void {
  }

  onRemovalConfirmed(){
    //remove the expense here
    console.log("remove expense");
  }
}
