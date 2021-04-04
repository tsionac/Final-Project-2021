import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService:AuthenticationService) { }
  //constructor() { }

  ngOnInit(): void {
  }



   // login to the site
   login(username:string, password:string){
    if(username !== '' && password !== ''){
      this.authService.login(username,password).subscribe((res:HttpResponse<any>) => {
        //console.log(res); //TODO : remove
      });
    }
  };
}
