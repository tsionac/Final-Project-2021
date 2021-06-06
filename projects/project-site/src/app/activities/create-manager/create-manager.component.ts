import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-create-manager',
  templateUrl: './create-manager.component.html',
  styleUrls: ['./create-manager.component.css']
})
export class CreateManagerComponent implements OnInit {

  constructor(private authService:AuthenticationService,  private alert:AlertService, private router:Router) { }

  ngOnInit(): void {
    if (this.authService.getUserID() != 'Admin') {
      this.authService.logout();
      this.alert.warn('You are not an admin! If you have the admin login info, please login to admin first.', undefined, undefined,8000)
      this.router.navigate(['/Login']);
    }
  }

  createManamager(userID:string, companyID:string, password:string) {
    let err = '';

    err = this.authService.validatePassword(password);
    if(err != ''){
      this.alert.error(err);
      return;
    }

    return this.authService.signup(userID, companyID, password).subscribe((res:HttpResponse<any>) => {
      this.alert.success('Manager created successfully!');
      this.router.navigate(['/Home']);
      // this.router.navigate(['/createManager']);
    }, (err:HttpErrorResponse) => {
      this.alert.error(err.error);
    });
  }

}
