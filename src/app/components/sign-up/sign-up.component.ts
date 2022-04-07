import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { SignUpModel, SignUpService } from './sign-up.service';

import * as sms from '@azure/communication-sms';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Md5 } from 'ts-md5';
import { Router } from '@angular/router';
import { RoutingConstants } from 'src/app/constants/routing.constants';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm = new FormGroup({
    companyName: new FormControl('', Validators.required),
    userName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    contactNumber: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
  });
  otpForm = new FormGroup({
    emailOTP: new FormControl('', Validators.required),
    mobileOTP: new FormControl('', Validators.required),
  });
  isLoading = false;
  isStep1 = true;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  isDataValid = false;
  constructor(
    private readonly signUpService: SignUpService,
    private readonly router: Router,
    private snackBar: MatSnackBar
  ) { }

  async ngOnInit(): Promise<void> {
  }
  onSubmit() {
    const signUpData = this.signUpForm.value;
    console.log('signUpData', signUpData);
    this.signUpService.emailOTP = Math.floor(100000 + Math.random() * 900000);
    this.signUpService.mobileOTP = Math.floor(100000 + Math.random() * 900000);
    this.signUpService.sendEmailOTP(signUpData.email, this.signUpService.emailOTP);
    console.log('email', this.signUpService.emailOTP);
    console.log('mobile', this.signUpService.mobileOTP);

    this.isStep1 = false;
  }
  onOtpValidate() {
    const otpForm = this.otpForm.value;
    console.log(otpForm);
    console.log(parseInt(otpForm.emailOTP) === this.signUpService.emailOTP);
    console.log(parseInt(otpForm.mobileOTP) === this.signUpService.mobileOTP);
    
    if (parseInt(otpForm.emailOTP) === this.signUpService.emailOTP && parseInt(otpForm.mobileOTP) === this.signUpService.mobileOTP) {
      const signUpData = this.signUpForm.value;
      const signUpModel: SignUpModel = {
        companyName: signUpData.companyName,
        email: signUpData.email,
        userName: signUpData.userName,
        mobileNumber: signUpData.contactNumber,
        password: Md5.hashStr(signUpData.password)
      };
      console.log(signUpModel);
      
      this.signUpService.signUp(signUpModel).then(res => {
        this.openSnackBar('SignUp successful');
        this.router.navigate([RoutingConstants.login]);

      }).catch(error => {
        console.log(error);
        
      });
    }
   

  }
  async onFocusOutCompany() {
    const signUpData = this.signUpForm.value;
    if (signUpData.companyName) {
      const isUnique = await this.signUpService.checkUniqueCompanyName(signUpData.companyName);
      if (!isUnique) {
        this.isDataValid = false;
        this.openSnackBar('This Company name is already used, Please Enter Unique Company Name');
      }
      else {
        this.isDataValid = true;
      }
    }
  }
  async onFocusOutMobile() {
    const signUpData = this.signUpForm.value;
    if (signUpData.contactNumber) {
      const isUnique = await this.signUpService.checkUniqueMobile(signUpData.contactNumber);
      if (!isUnique) {
        this.isDataValid = false;
        this.openSnackBar('This mobile number is already used, Please Enter Unique Mobile number');
      }
      else {
        this.isDataValid = true;
      }
    }
  }
  async onFocusOutEmail() {
    const signUpData = this.signUpForm.value;
    if (signUpData.email) {
      const isUnique = await this.signUpService.checkUniqueEmail(signUpData.email);
      if (!isUnique) {
        this.isDataValid = false;
        this.openSnackBar('This Email id is already used, Please Enter Unique Email id');
      }
      else {
        this.isDataValid = true;
      }
    }
  }
  async onFocusOutUserName() {
    const signUpData = this.signUpForm.value;
    if (signUpData.userName) {
      const isUnique = await this.signUpService.checkUniqueUserName(signUpData.userName);
      if (!isUnique) {
        this.isDataValid = false;
        this.openSnackBar('This User name is already used, Please Enter Unique User Name');
      }
      else {
        this.isDataValid = true;
      }
    }
  }

  onFocusOutPassword() {
    const signUpData = this.signUpForm.value;
    if (signUpData.password && signUpData.confirmPassword) {
      if (signUpData.password !== signUpData.confirmPassword) {
        this.isDataValid = false;
        this.openSnackBar('Password and Confirm Password is not matching');
      }
      else {
        this.isDataValid = true;
      }
    }
  }
  openSnackBar(message: string) {
    let config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = 2000;
    this.snackBar.open(message, 'Retry', config);
  }
}
