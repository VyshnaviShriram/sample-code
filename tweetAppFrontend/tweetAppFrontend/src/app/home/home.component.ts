import { ANALYZE_FOR_ENTRY_COMPONENTS, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, switchMap } from 'rxjs';
import { JwtTokenService } from '../service/jwt-token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  refreshUserTweets = new BehaviorSubject<Boolean>(true);
  hideUserReplies: boolean[] = [];

  postTweetMessage!: any;
  postTweetTag!: any;
  postTweetForm!: FormGroup;
  @ViewChild('closePostModal') closePostModal: any;

  editTweet!: any
  editTweetMessage!: any;
  editTweetTag!: any;
  editTweetForm!: FormGroup;
  @ViewChild('closeEditModal') closeEditModal: any;

  deleteTweet!: any
  @ViewChild('closeDeleteModal') closeDeleteModal: any;

  constructor(private jwtService: JwtTokenService) { }

  tweet: any
  id: any
  username: any
  tweets: any
  user: any
  likes: any

  tweetReply: any
  replyTweetForm!: FormGroup;
  replyTweetMessage!: any;
  replyTweetTag!: any;
  @ViewChild('closeReplyModal') closeReplyModal: any;


  validatePostTweetForm() {
    if (this.postTweetForm.invalid) {
      this.postTweetForm.get('postTweetMessage')?.markAsTouched();
      return;
    }
  }

  validateEditTweetForm() {
    if (this.editTweetForm.invalid) {
      this.editTweetForm.get('editTweetMessage')?.markAsTouched();
      return;
    }
  }

  validateReplyTweetForm() {
    if (this.replyTweetForm.invalid) {
      this.replyTweetForm.get('replyTweetMessage')?.markAsTouched();
      return;
    }
  }

  public updateTweet() {
    if (this.editTweetForm.valid) {
      this.closeEditModal.nativeElement.click();
      let editTweet: any = {};
      if (this.editTweetForm.value.editTweetMessage) { editTweet.tweet = this.editTweetForm.value.editTweetMessage; }
      if (this.editTweetForm.value.editTweetTag) { editTweet.tweetTag = this.editTweetForm.value.editTweetTag; }
      console.log(editTweet);
      this.jwtService.updateTweet(this.editTweet.id, editTweet).subscribe(data => {
        this.refreshUserTweets.next(true);
      });
    }
  }

  addTweet() {
    if (this.postTweetForm.valid) {
      this.closePostModal.nativeElement.click();
      let postTweet: any = {};
      if (this.postTweetForm.value.postTweetMessage) { postTweet.tweet = this.postTweetForm.value.postTweetMessage; }
      if (this.postTweetForm.value.postTweetTag) { postTweet.tweetTag = this.postTweetForm.value.postTweetTag; }
      console.log(postTweet);
      this.jwtService.postTweet(postTweet).subscribe(data => {
        this.refreshUserTweets.next(true);
      });
    }
  }

  likeTweet(id: any) {
    let resp = this.jwtService.likeTweet(this.user, id);
    resp.subscribe((data: any) => {
      this.likes = data;
      this.refreshUserTweets.next(true);
    });
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
        this.refreshUserTweets.next(true);
      });
    }
  }

  public removeTweet() {
    this.closeDeleteModal.nativeElement.click();
    this.jwtService.deleteTweet(this.deleteTweet).subscribe(data => {
      this.refreshUserTweets.next(true);
    });
  }

  ngOnInit() {
    this.username = localStorage.getItem("username");

    let response = this.jwtService.getAllTweetsofUser(this.username);
    this.tweets = this.refreshUserTweets.pipe(switchMap(test => response));

    this.postTweetForm = new FormGroup({
      "postTweetMessage": new FormControl('', [Validators.required, Validators.maxLength(144)]),
      "postTweetTag": new FormControl('', Validators.maxLength(50))
    });

    this.editTweetForm = new FormGroup({
      "editTweetMessage": new FormControl('', [Validators.required, Validators.maxLength(144)]),
      "editTweetTag": new FormControl('', Validators.maxLength(50))
    });

    this.replyTweetForm = new FormGroup({
      "replyTweetMessage": new FormControl('', [Validators.required, Validators.maxLength(144)]),
      "replyTweetTag": new FormControl('', Validators.maxLength(50))
    });
  }

}
