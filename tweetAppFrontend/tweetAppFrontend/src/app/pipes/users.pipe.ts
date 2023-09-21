import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class UsersPipe implements PipeTransform {
  
  transform(list:any[],username:any): any[] {
    if(!username){
      return list;
    }
    return list?list.filter(user=>{
      return user.userName.includes(username);
    }):[]; 
  }

}
