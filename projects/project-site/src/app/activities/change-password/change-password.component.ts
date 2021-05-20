import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs-compat';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private authService:AuthenticationService, private router:Router) { }

  
  ngOnInit(): void {
  }
  changePassword(currPass:string, newPassword:string, repPass:string){
    if (newPassword == repPass){
      this.authService.changePassword(currPass, newPassword).subscribe((res:HttpResponse<any>)=>{
        if(res.status == 200){
          console.log("success change password");
        }
        else{
          console.log(res.body); 
        }
      }
      
      );

    }
  }

}
