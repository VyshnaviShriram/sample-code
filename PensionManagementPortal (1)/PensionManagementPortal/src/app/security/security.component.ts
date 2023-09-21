import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginSessionService } from '../service/login-session.service';
import { JwtClientService } from '../service/jwt-client.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})
export class SecurityComponent implements OnInit {

  constructor(private service: JwtClientService, private loginService: LoginSessionService,
    private router: Router) { }
  showPassword = false

  username: string = ''
  password: string = ''
  exForm: FormGroup



  ngOnInit(): void {
    this.exForm = new FormGroup({
      "name": new FormControl('', Validators.required),
      "password": new FormControl('', Validators.required)
    })

  }


  raiseError = false
  Jwt: any = ''
  isLoggedin = false;


  runLoginAuth() {

    this.getAccessToken(this.username, this.password)

  }

  validateForm() {
    if (this.exForm.invalid) {
      this.exForm.get('name').markAsTouched();
      this.exForm.get('password').markAsTouched();
      return;
    }

  }


  public getAccessToken(username, password) {
    let resp = this.service.generateToken({
      "userName": this.username,
      "password": this.password
    });
  
    resp.subscribe(data => {
      this.Jwt = data
      this.isLoggedin = true;
      this.raiseError = false;

      this.loginService.createUserSession(true, this.Jwt.jwtAuthToken,this.Jwt.userName);
      this.router.navigate(['homepage']);
    },
      error => { this.raiseError = true; });
  
  }



}
