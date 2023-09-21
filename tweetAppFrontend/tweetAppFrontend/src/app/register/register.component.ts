import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtTokenService } from '../service/jwt-token.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private jwtService:JwtTokenService, private router: Router) { }
  
  firstName: string =''
  lastName: string =''
  email: string= ''
  userName: string= ''
  password: string= ''
  confirmPassword: string= ''
  contactNumber: string= ''
  exForm!: FormGroup
  raiseError=false

  public registerUser(){
      let resp = this.jwtService.register({
        "firstName":this.firstName,
        "lastName":this.lastName,
        "email":this.email,
        "userName": this.userName,
        "password": this.password,
        "confirmpassword":this.confirmPassword,
        "contactNumber":this.contactNumber
      });
      resp.subscribe((data: any) => {
        this.raiseError = false;
        this.router.navigate(['login']);
      },
        (error: any) => { this.raiseError = true; }); 
  }

  validateForm(){
    if(this.exForm.invalid){
      this.exForm.get('firstName')?.markAsTouched;
      this.exForm.get('lastName')?.markAsTouched;
      this.exForm.get('email')?.markAsTouched;
      this.exForm.get('userName')?.markAsTouched;
      this.exForm.get('password')?.markAsTouched;
      this.exForm.get('confirmPassword')?.markAsTouched;
      this.exForm.get('contactNumber')?.markAsTouched;
    }
  }

  ngOnInit(): void {
    this.exForm = new FormGroup({
      "firstName" :new FormControl('',Validators.required),
      "lastName" :new FormControl('',Validators.required),
      "email" :new FormControl('',Validators.required),
      "userName" :new FormControl('',Validators.required),
      "password" :new FormControl('',[Validators.required]),
      "confirmPassword" : new FormControl('',[Validators.required]),
      "contactNumber" :new FormControl('',[Validators.required])
    })
  }
  
}
