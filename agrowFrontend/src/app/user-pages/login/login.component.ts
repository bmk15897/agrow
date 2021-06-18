import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CloudantDataService } from 'src/app/service/cloudant-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  mobileNo: FormControl;
  OTP: FormControl; 

  constructor(
    private cloudantService: CloudantDataService
  ) { }

  ngOnInit() {

    this.loginForm = new FormGroup({
      mobileNo: new FormControl('', Validators.required), 
      OTP: new FormControl('', Validators.required)
    });

  }

  submit() {
    console.log('Clicked submit');

    let req  = {
      "phone": this.loginForm.value.mobileNo,
      "otp": this.loginForm.value.OTP
    };

    localStorage.setItem("phone",req.phone);

    console.log("Login req: " + req);

    this.cloudantService.login(req).subscribe( res => {

      console.log('Login Response: ' + JSON.stringify(res))
    });

  
  }

}
