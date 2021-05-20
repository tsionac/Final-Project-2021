import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private authService:AuthenticationService, private router:Router) { }

  
  ngOnInit(): void {
  }
  // changePassword(currPass:string, newPassword:string, repPass:string){

  //   if(username !== '' && password !== ''){
  //     this.authService.login(username,password).subscribe((res:HttpResponse<any>) => {
  //       if(res.status === 200){
  //         console.log(res.body.userID)
  //         // login was succesfull, redirecting to the activity view
          
  //         // this.router.navigate(['/Home']);
  //       }
  //     });
  //   }
  // }

}
