import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { JwtTokenService } from '../service/jwt-token.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private jwtService:JwtTokenService) { }

  users:any
  searchUsername:any
  raiseError =false

  public getUsers(){
    let resp= this.jwtService.getUsersList();
    resp.subscribe((data:any)=> {
      this.users = data;
    });
  }

  public getUsersByUsername(){
    alert();
    let resp=this.jwtService.getUserByUsername(this.searchUsername);
    resp.subscribe((data:any)=> {
      this.users = data;
      this.raiseError = false;
    },
    (error: any) => { this.raiseError = true; });
    return this.users;
  }
  
  ngOnInit() {
    this.getUsers();
  }

}
