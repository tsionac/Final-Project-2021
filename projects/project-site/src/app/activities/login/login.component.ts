import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AlertService } from '../../services/alert.service';
import { AuthenticationService } from '../../services/authentication.service';
import { NGXLogger } from "ngx-logger";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user_n:string;

  constructor(private authService:AuthenticationService, private router:Router,  private alert:AlertService, private logger: NGXLogger) {
  }
  //constructor() { }


  public getUserName(){
    return this.user_n;
  }
  ngOnInit(): void {
  }



   // login to the site
   login(username:string, password:string){
    if(username !== '' && password !== ''){
      this.authService.login(username,password).subscribe((res:HttpResponse<any>) => {
        if(res.status === 200){

          this.alert.success('Logged in successfully as ' + res.body.userID);
          // login was succesfull, redirecting to the activity view
          this.user_n = res.body.userID;
          this.router.navigate(['/Home']);
        } else {
          this.alert.error('Could not login! The system encountered difficulties, please try again later. If this error occurs several times, please contact the admin. error code:' + res.status);
          this.logger.error('Could not login! error code:', res.status);
        }
      }, (err:HttpErrorResponse) => {
        this.alert.error(err.error);
        this.logger.error('Could not login! (HttpErrorResponse):', err.error);

      });
    }
  }
}
