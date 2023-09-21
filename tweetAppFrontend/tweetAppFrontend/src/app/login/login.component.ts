import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtTokenService } from '../service/jwt-token.service';
import { LoginService } from '../service/login.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private jwtService: JwtTokenService, private loginService: LoginService,
    private router: Router) { }
  showPassword = false

  username: string = ''
  password: string = ''
  exForm!: FormGroup

  ngOnInit(): void {
    this.exForm = new FormGroup({
      "username": new FormControl('', Validators.required),
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
      this.exForm.get('username')?.markAsTouched();
      this.exForm.get('username')?.markAsTouched();
      return;
    }

  }

  public getAccessToken(username: string, password: string) {
    let resp = this.jwtService.generateToken({
      "username": this.username,
      "password": this.password
    });

    resp.subscribe((data: any) => {
      this.Jwt = data
      this.isLoggedin = true;
      this.raiseError = false;

      this.loginService.createUserSession(true, this.Jwt.token, this.Jwt.user);
      this.router.navigate(['home']);
    },
      (error: any) => { this.raiseError = true; });

  }


}
