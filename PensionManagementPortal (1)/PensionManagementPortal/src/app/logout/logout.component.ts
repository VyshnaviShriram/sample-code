import { Component, OnInit } from '@angular/core';
import { LoginSessionService } from '../service/login-session.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private service: LoginSessionService) { }

  time = 3;


  ngOnInit(): void {


    setInterval(() => this.time--, 1000);
    this.service.logout()
  }

}


