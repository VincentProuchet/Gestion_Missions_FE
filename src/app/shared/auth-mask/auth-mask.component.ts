import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth-mask',
  templateUrl: './auth-mask.component.html',
  styleUrls: ['./auth-mask.component.css']
})
export class AuthMaskComponent implements OnInit {

  @Input() cond: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
