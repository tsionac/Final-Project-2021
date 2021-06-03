import { Component, OnInit } from '@angular/core';
import { AppComponentServiceService } from '../app-component-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
public username;
  constructor(private userNameService:AppComponentServiceService) { }

  ngOnInit(): void {
  }

  login(){
    this.userNameService.setUser(this.username);
  }
}
