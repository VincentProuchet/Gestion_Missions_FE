import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modify-nature',
  templateUrl: './modify-nature.component.html',
  styleUrls: ['./modify-nature.component.css']
})
export class ModifyNatureComponent implements OnInit {

  formGroupModifyNature: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router) {
    this.formGroupModifyNature = formBuilder.group({
    })
  }

  ngOnInit(): void { }

  onSubmit(): void {
    this.router.navigate(['modifierNature']);
  }

  onCancel(): void {
    //register the new mission, if valid
    this.router.navigate(['modifierNature']);
  }

}
