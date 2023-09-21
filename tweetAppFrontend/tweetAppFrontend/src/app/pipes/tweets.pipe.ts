import { Pipe, PipeTransform } from '@angular/core';
import { TweetsComponent } from '../tweets/tweets.component';

@Pipe({
  name: 'tweets'
})
export class TweetsPipe implements PipeTransform {

  transform(list:any[],userName:any): any[] {
    if(!userName){
      return list;
    }
    return list?list.filter(tweet=>{
      return tweet.user.userName.includes(userName);
    }):[]; 
  }

}
