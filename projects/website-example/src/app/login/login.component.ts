import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
public username = '';
  constructor() { }

  ngOnInit(): void {
  }
  public login(){
    this.username = (<HTMLInputElement>document.getElementById("exampleInputEmail1")).value;
    console.log(this.username)

  }

}
