import { Component, OnInit } from '@angular/core';
import { LoginSessionService } from '../service/login-session.service';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit {

  constructor(public service: LoginSessionService) { }

  ngOnInit(): void {
  }

}
