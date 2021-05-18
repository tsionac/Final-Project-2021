import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user_n:string;

  constructor(private authService:AuthenticationService, private router:Router) { }
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
          console.log(res.body.userID)
          // login was succesfull, redirecting to the activity view
          this.user_n = res.body.userID;
          this.router.navigate(['/Home']);
        }
      });
    }
  };
}
