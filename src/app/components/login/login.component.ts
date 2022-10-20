import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as Notiflix from 'notiflix';
import { AP_Vars } from 'src/environments/API_Vars';
import { Collaborator } from '../../model/collaborator';
import { LoginCredentials } from '../../model/login-credentials';
import { AuthenticationService } from '../../service/authentication.service';
import { CollaboratorService } from '../../service/collaborator.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
/**
Our magnificent login page
*/
export class LoginComponent implements OnInit {





  /** form controls */
  loginForm: FormGroup = this.formBuilder.group({
    usernameControl: ['', [Validators.required]],
    passwordControl: ['', [Validators.required]],
    rememberMeCheckbox: [true]
  });
  controlName = {
    usernameControl: "usernameControl"
    , passwordControl: "passwordControl"
  }

  constructor(private router: Router, private formBuilder: FormBuilder, public srvAuth: AuthenticationService,
    private srvCollab: CollaboratorService) {
  }

  ngOnInit(): void {
  }
  /**
   * method for connecting the loginform to backEnd
  made in parrallel to not mess with FE dev that still need to use the json-server
   * @returns void
   */
  onSubmit(): void {
    if (this.loginForm.valid) {
      this.srvAuth.login(this.collectForm());
    }
  }
  inputIsInvalid(inputName: string) {
    let isTouched: boolean = this.loginForm.controls[inputName].invalid && (this.loginForm.controls[inputName].dirty || this.loginForm.controls[inputName].touched);
    let required: boolean = this.loginForm.controls[inputName].errors?.['required'];
    return isTouched && required;
  }
  /**
   * get all datas form the form
  and give them back in a convenient loginCredential form
   * @returns LoginCredential
   */
  collectForm(): LoginCredentials {
    return {
      username: this.loginForm.controls[this.controlName.usernameControl].value,
      password: this.loginForm.controls[this.controlName.passwordControl].value
    };
  }

}
