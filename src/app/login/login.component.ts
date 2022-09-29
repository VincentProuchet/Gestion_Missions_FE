import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as Notiflix from 'notiflix';
import { AP_Vars } from 'src/environments/API_Vars';
import { LoginCredentials } from '../model/login-credentials';
import { AuthenticationService } from '../service/authentication.service';
import { CollaboratorService } from '../service/collaborator.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
/**
Our magnificent login page
*/
export class LoginComponent implements OnInit {
  /** if an error as occured  */
  error !: String
  incorrectCredentials: boolean = false;
  /** for setting user data cookies */
  loginCookieName: string = AP_Vars.CookiesNameUser;
  /** form controls */
  loginForm: FormGroup = this.formBuilder.group({
    usernameControl: ['', [Validators.required]],
    passwordControl: ['', [Validators.required]],
    rememberMeCheckbox: [true]
  });

  constructor(private router: Router, private formBuilder: FormBuilder, private authenticationService: AuthenticationService,
    private srvCollab: CollaboratorService) {
    this.loginForm
  }

  ngOnInit(): void {
  }
  /**
   * method for connecting the loginform to backEnd
  made in parrallel to not mess with FE dev that still need to use the json-server
   * @returns void
   */
  onSubmitToBE(): void {
    if (this.loginForm.invalid) {
      return;
    }
    let loginCred = this.collectForm();
    let loginAttempt: boolean;
    this.authenticationService.loginfromdb(loginCred).subscribe(
      {
        next: (data) => {
          console.log("server said yes");
          this.srvCollab.getConnectedUser().subscribe(
            {
              next: (data) => {
                console.log("got user");
                sessionStorage.setItem(this.loginCookieName, JSON.stringify(data));
              }
              ,
              error: (e: HttpErrorResponse) => {
                console.log(e);
              }
            }
          );
        }
        , error: (e: HttpErrorResponse) => {
          this.incorrectCredentials = true;
          this.error = e.error;
          //Notiflix.Notify.failure(e.error); // unecessary
          console.log(e);

          this.srvCollab.getConnectedUser().subscribe(
            {
              next: (data) => {
                console.log(data);
                localStorage.setItem(this.loginCookieName, JSON.stringify(data));
                window.location.reload();
              }
              ,
              error: (e: HttpErrorResponse) => {
                console.log(e);


              }
            }
          );
        }
      }
    );
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
      "username": this.loginForm.controls['usernameControl'].value,
      "password": this.loginForm.controls['passwordControl'].value
    };
  }
  dismissError() {
    this.incorrectCredentials = false;
  }

}
