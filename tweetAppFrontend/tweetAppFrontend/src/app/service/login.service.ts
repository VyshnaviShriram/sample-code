import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private router: Router) { }

  createUserSession(isLoggedin: any, token: string, user: any) {
    console.log(user, token);
    if (isLoggedin) {
      localStorage.setItem('token', token);
      localStorage.setItem("username", user.userName);
      return true;

    }
    else return false;
  }

  isUserLoggedIn() {
    let user = localStorage.getItem('token');
    return !(user === null)
  }

  logout() {
    if (this.isUserLoggedIn()) {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
    }
    setTimeout(() => {
      this.router.navigate(['login']);
    }, 3000);
  }

}

