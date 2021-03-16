import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppComponentServiceService {

  username:string;

  getUser():string{
    return this.username;
  }

  setUser(name:string):void{
    this.username = name;
  }


  constructor() { }
}
