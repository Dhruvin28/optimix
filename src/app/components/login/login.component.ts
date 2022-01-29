import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginModule, LoginService } from 'src/app/services/login.service';
import { Md5 } from 'ts-md5';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });
  constructor(
    private readonly router: Router,
    private readonly loginService: LoginService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }
  async onSubmit() {
    const formValue = this.loginForm.value;
    const loginModule = {
      userName: formValue.userName,
      password:  Md5.hashStr(formValue.password)
    } as LoginModule;
   
    this.loginService.checkLogin(loginModule).subscribe(r => {
      const result = r as {token: string;valid: boolean};
      if (result.valid) {
        sessionStorage.setItem('loggedIn', 'true');
        localStorage.setItem('jwtToken', result.token);
        this.router.navigate(['dashboard']);
      }
      else {
        this.openSnackBar();
      }
    });
  }
  openSnackBar() {
    this._snackBar.openFromComponent(SnackComponent, {
      duration: 2000,
    });
  }
}

@Component({
  template: `
  <span>
  Sorry, try again!
</span>
  `,
  styles: [
    `
    .example-pizza-party {
      color: hotpink;
    }
  `,
  ],
})
export class SnackComponent {}