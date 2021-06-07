import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import {NotificationsService} from 'angular2-notifications';
import { AlertService } from './services/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project-site';

  constructor(private authService:AuthenticationService, private alert:AlertService) {}

  logoutClick() {
    var username:string = this.authService.getUserID();
    this.authService.logout();
    this.alert.success(username + ' logged out!');
  }

}
