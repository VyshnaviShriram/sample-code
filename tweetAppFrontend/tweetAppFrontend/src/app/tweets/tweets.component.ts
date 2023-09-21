import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, switchMap } from 'rxjs';
import { JwtTokenService } from '../service/jwt-token.service';

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.css']
})
export class TweetsComponent implements OnInit {

  constructor(private jwtService: JwtTokenService) { }

  refreshTweets = new BehaviorSubject<Boolean>(true);
  hideReplies: boolean[] = [];

  tweets: any
  tweet: any

  tweetReply!: any
  replies: any
  replyTweetForm!: FormGroup;
  replyTweetMessage!: any;
  replyTweetTag!: any;
  @ViewChild('closeReplyModal') closeReplyModal: any;

  user: any
  userName: any
  id: any
  likes: any

  raiseError = false

  public getAllTweetsofUser(user: any) {
    let resp = this.jwtService.getAllTweetsofUser(user);
    resp.subscribe((data: any) => {
      this.tweets = data;
      this.raiseError = false;
      this.refreshTweets.next(true);
    },
      (error: any) => { this.raiseError = true; });
    return this.tweets;
  }

  likeTweet(id: any) {
    let resp = this.jwtService.likeTweet(this.user, id);
    resp.subscribe((data: any) => {
      this.likes = data;
      this.refreshTweets.next(true);
    });
  }

  validateReplyTweetForm() {
    if (this.replyTweetForm.invalid) {
      this.replyTweetForm.get('replyTweetMessage')?.markAsTouched();
      return;
    }
  }

  replyTweet() {
    if (this.replyTweetForm.valid) {
      this.closeReplyModal.nativeElement.click();
      let tweet: any = {};
      if (this.replyTweetForm.value.replyTweetMessage) { tweet.tweet = this.replyTweetForm.value.replyTweetMessage; }
      if (this.replyTweetForm.value.replyTweetTag) { tweet.tweetTag = this.replyTweetForm.value.replyTweetTag; }
      console.log(tweet);
      let resp = this.jwtService.replyTweet(this.tweetReply.id, tweet);
      resp.subscribe((data: any) => {
        this.refreshTweets.next(true);
      });
    }
  }

  ngOnInit() {
    this.user = localStorage.getItem("username");
    let response=this.jwtService.getAllTweets();
    this.tweets = this.refreshTweets.pipe(switchMap(test => response));
    
    this.replyTweetForm = new FormGroup({
      "replyTweetMessage": new FormControl('', [Validators.required, Validators.maxLength(144)]),
      "replyTweetTag": new FormControl('', Validators.maxLength(50))
    });
  }

}
