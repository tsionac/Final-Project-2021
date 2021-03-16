import { Component,ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
  public username;
  title = 'website-example';
  currUser = 'firstUser';
  
  index=0;

  constructor(private cdRef:ChangeDetectorRef) {}
  
  makeid(length): string {
    var result           = '';
    var characters       = '0123456789';//'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
   
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    
    return result;
 }
 
  
  generateUserID(): string{
    //return 'user_' + this.makeid(3);
    this.index++;

    return 'user_' + this.index;
  }


  random_user(){
    this.currUser = this.generateUserID();
  }


  login(){
    this.currUser = this.username;
  }
}
