import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { AuthenticationService } from '../../services/authentication.service';
import { NGXLogger } from "ngx-logger";

@Component({
  selector: 'app-create-manager',
  templateUrl: './create-manager.component.html',
  styleUrls: ['./create-manager.component.css']
})
export class CreateManagerComponent implements OnInit {

  constructor(private authService:AuthenticationService,  private alert:AlertService, private router:Router, private logger: NGXLogger) { }

  ngOnInit(): void {
    if (this.authService.getUserID() != 'Admin') {
      var username:string = this.authService.getUserID();
      this.authService.logout();
      this.alert.warn(username + ', you are not an admin! If you have the admin login info, please login as admin first.', undefined, undefined,8000)
      this.router.navigate(['/Login']);
    }
  }

  createManamager(userID:string, companyID:string, password:string) {
    if(userID == '' || userID == undefined || companyID == '' || companyID == undefined || password == '' || password == undefined  ) {
      let err = 'not all requred inputs was given!';
      this.alert.error(err);
      this.logger.error('Create manager encountered error:', err);
      return false;
    }

    let err = this.authService.validatePassword(password);
    if(err != ''){
      this.alert.error(err);
      this.logger.error('Create manager (validatePassword) encountered error:', err)
      return false;
    }

    return this.authService.signup(userID, companyID, password).subscribe((res:HttpResponse<any>) => {
      this.alert.success('Manager created successfully!');
      this.router.navigate(['/Home']);
      // this.router.navigate(['/createManager']);
    }, (err:HttpErrorResponse) => {
      this.alert.error(err.error);
      this.logger.error('Create manager (HttpErrorResponse) encountered error:', err.error)
    });
  }

}
