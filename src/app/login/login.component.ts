import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginCredentials } from '../model/login-credentials';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  incorrectCredentials: boolean = false;

  loginForm: FormGroup;

  constructor(private router: Router, private formBuilder: FormBuilder, private authenticationService: AuthenticationService) {
    this.loginForm = formBuilder.group({
      usernameControl: ['', [Validators.required]],
      passwordControl: ['', [Validators.required]],
      rememberMeCheckbox: [true]
    });
  }

  ngOnInit(): void {
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
          console.log("login OK");
          window.location.reload();
        } else {
          console.log("login fail");
          this.incorrectCredentials = true;
        }
      },
      error: (err) => console.log(err)
    });
  }

  inputIsInvalid(inputName: string) {
    let isTouched: boolean = this.loginForm.controls[inputName].invalid && (this.loginForm.controls[inputName].dirty || this.loginForm.controls[inputName].touched);
    let required: boolean = this.loginForm.controls[inputName].errors?.['required'];
    return isTouched && required;
  }

}
