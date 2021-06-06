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
    let err = '';

    err = this.authService.validatePassword(newPassword);
    if(err != ''){
      this.alert.error(err);
      return;
    }

    if (newPassword != repPass){
      this.alert.error('The passwords do not match!');
      return;
    }

    this.authService.changePassword(currPass, newPassword).subscribe((res:HttpResponse<any>)=>{
      if(res.status == 200){
        this.alert.success('Password changed successfully!');
      }
      else{
        this.alert.error(res.body);
      }
    },(err:HttpErrorResponse) => {
      this.alert.error(err.error);
    });
  }

}
