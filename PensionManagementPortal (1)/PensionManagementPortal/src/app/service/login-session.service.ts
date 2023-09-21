import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginSessionService {

  constructor(private router: Router) { }

  createUserSession(isLoggedin,token, username) {
    if (isLoggedin) {
      localStorage.setItem('authenticaterUser',token);
      localStorage.setItem('username',username);
      return true;

    }
    else return false;
  }

  isUserLoggedIn() {
    let user = localStorage.getItem('authenticaterUser');
    return !(user === null)
  }

  logout() {
    if (this.isUserLoggedIn())
      localStorage.removeItem('authenticaterUser')
    setTimeout(() => {
      this.router.navigate(['login']);
    }, 3000);
  }


}
