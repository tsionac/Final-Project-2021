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
    this.alert.success('Logged out!');
    this.authService.logout();
  }

}
