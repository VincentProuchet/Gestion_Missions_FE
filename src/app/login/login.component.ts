import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginCredentials } from '../model/login-credentials';
import { AuthenticationService } from '../service/authentication.service';
import { CollaboratorService } from '../service/collaborator.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  incorrectCredentials: boolean = false;

  loginForm: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private authenticationService: AuthenticationService,
    private srvCollab: CollaboratorService) {
    this.loginForm = formBuilder.group({
      usernameControl: ['', [Validators.required]],
      passwordControl: ['', [Validators.required]],
      rememberMeCheckbox: [true]
    });
  }

  ngOnInit(): void {
    if (sessionStorage.getItem("loginerr")) {
      this.incorrectCredentials = true;
    }
    if (sessionStorage.getItem("username")) {
      this.loginForm.controls['usernameControl'].setValue(sessionStorage.getItem("username"));
    }
    sessionStorage.removeItem("loginerr");
    sessionStorage.removeItem("username");
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }
    let loginCred: LoginCredentials = {
      "username": this.loginForm.controls['usernameControl'].value,
      "password": this.loginForm.controls['passwordControl'].value
    };
    let loginAttempt: boolean;
    this.authenticationService.login(loginCred).subscribe({
      next: (data) => {
        loginAttempt = data;
        if (loginAttempt) {
          window.location.reload();
        } else {
          sessionStorage.setItem("loginerr", "incorrect");
          sessionStorage.setItem("username", this.loginForm.controls['usernameControl'].value);
          window.location.reload();
        }
      },
      error: (err) => console.log(err)
    });
  }
  /**
   *
   * @returns
   */
  onSubmitProd(): void {
    if (this.loginForm.invalid) {
      return;
    }
    let loginCred: LoginCredentials = {
      "username": this.loginForm.controls['usernameControl'].value,
      "password": this.loginForm.controls['passwordControl'].value
    };
    let loginAttempt: boolean;
    this.authenticationService.loginfromdb(loginCred).subscribe(
      {
        next: () => {
          console.log("server responded");

          this.srvCollab.getConnectedUser().subscribe(
            {
              next: (data) => {
                console.log("asking user");

                sessionStorage.setItem("user", JSON.stringify(data));
              }
              ,
              error: () => { }
            }
          );
        }
        , error: (error) => {
          sessionStorage.setItem("loginerr", "incorrect");
          sessionStorage.setItem("username", this.loginForm.controls['usernameControl'].value);
          window.location.reload();
        }
      }
    );
  }

  inputIsInvalid(inputName: string) {
    let isTouched: boolean = this.loginForm.controls[inputName].invalid && (this.loginForm.controls[inputName].dirty || this.loginForm.controls[inputName].touched);
    let required: boolean = this.loginForm.controls[inputName].errors?.['required'];
    return isTouched && required;
  }

}
