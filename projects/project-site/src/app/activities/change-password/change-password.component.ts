import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs-compat';
import { AlertService } from '../../services/alert.service';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private authService:AuthenticationService, private alert:AlertService, private router:Router) { }


  ngOnInit(): void {
  }
  changePassword(currPass:string, newPassword:string, repPass:string){

    const passLen = 8;

    if (newPassword.length < passLen || repPass.length < passLen){
      this.alert.error('new passwors is too short! use 8 characters atleast!');
      return;
    }

    if (newPassword != repPass){
      this.alert.error('the passwords do not  mutch!');
      return;
    }

    this.authService.changePassword(currPass, newPassword).subscribe((res:HttpResponse<any>)=>{
      if(res.status == 200){
        this.alert.success('successed to change password!');
      }
      else{
        this.alert.error(res.body);
      }
    },(err:HttpErrorResponse) => {
      this.alert.error(err.error);
    });
  }

}
