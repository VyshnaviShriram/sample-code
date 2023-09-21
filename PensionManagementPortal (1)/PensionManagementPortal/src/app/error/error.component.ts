import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginSessionService } from '../service/login-session.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  constructor(private service:LoginSessionService,private router:Router) { }

  time=3;

 
  ngOnInit(): void {


    setInterval(()=>this.time--, 1000);
    this.router.navigate(['homepage'])  
  }

}
