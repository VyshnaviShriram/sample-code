import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtTokenService } from '../service/jwt-token.service';

@Component({
  selector: 'app-forgot.password',
  templateUrl: './forgot.password.component.html',
  styleUrls: ['./forgot.password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private jwtService:JwtTokenService,private router:Router) { }

  userName:any
  user:any
  newPassword:any
  confirmPassword:any
  exForm!:FormGroup

  raiseError= false

  forgotPassword(){
    let userDetails={
      'username':this.userName,
      'password':this.newPassword
    }
    let resp=this.jwtService.resetPassword(this.userName,userDetails);
    
    resp.subscribe((data: any) => {
      this.raiseError = false;
      this.router.navigate(['login']);
    },
      (error: any) => { this.raiseError = true; }); 
  }

  validateForm() {
    if(this.exForm.invalid){ 
      this.exForm.get('userName')?.markAsTouched;
      this.exForm.get('newPassword')?.markAsTouched;
      this.exForm.get('confirmPassword')?.markAsTouched;
    }
  }

  ngOnInit(): void {
    this.exForm = new FormGroup({
      "userName" :new FormControl('',Validators.required),
      "newPassword" :new FormControl('',[Validators.required]),
      "confirmPassword" :new FormControl('',[Validators.required])
    })
  }

}
