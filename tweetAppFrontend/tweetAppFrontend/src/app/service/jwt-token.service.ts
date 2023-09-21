import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class JwtTokenService {
    constructor(private http: HttpClient) { }

    JWT = localStorage.getItem('authenticaterUser')
    token: string = ''

    public generateToken(request: any){
      let resp =this.http.post("http://localhost:9091/api/v1.0/tweets/login",request);
      return resp;
    }

    public register(request:any){
      let resp= this.http.post("http://localhost:9091/api/v1.0/tweets/register",request);
      return resp;
    }

    public getUsersList(){
      return this.http.get("http://localhost:9091/api/v1.0/tweets/users/all");
    }

    public getUserByUsername(username:any){
      alert(username);
      let url= "http://localhost:9091/api/v1.0/tweets/user/search/"+username;
      return this.http.get(url);
    }

    public resetPassword(username:any,user:any){
      let resp= this.http.put("http://localhost:9091/api/v1.0/tweets/"+username+"/forgot",user);
      alert(resp);
      return resp;
    }

    public getAllTweets(){
      let resp = this.http.get("http://localhost:9091/api/v1.0/tweets/all");
      return resp;
    }

    public getAllTweetsofUser(username:any){
      let resp = this.http.get("http://localhost:9091/api/v1.0/tweets/"+ username);
      return resp;
    }

    public postTweet(tweet:any){
      let username=localStorage.getItem("username");
      let resp = this.http.post("http://localhost:9091/api/v1.0/tweets/"+ username +"/add",tweet);
      return resp;
    }

    public updateTweet(id:any,tweet:any){
      let username=localStorage.getItem("username");
      let resp = this.http.put("http://localhost:9091/api/v1.0/tweets/"+ username +"/update/"+id,tweet);
      return resp;
    }

    public deleteTweet(tweet:any){
      let username=localStorage.getItem("username");
      return this.http.delete("http://localhost:9091/api/v1.0/tweets/"+ username +"/delete/"+tweet.id);
    }

    public likeTweet(username:any,id:any){ 
      let resp = this.http.put("http://localhost:9091/api/v1.0/tweets/"+ username +"/like/"+id,{});
      return resp;
    }

    public replyTweet(id:any,replyTweet:any){
      let username=localStorage.getItem("username");
      console.log(replyTweet);
      let resp = this.http.post("http://localhost:9091/api/v1.0/tweets/"+ username +"/reply/"+id,replyTweet);
      console.log(resp);
      return resp;
    }

}
