// many parts of the user authentication in the frontend was havely based on this youtube tutorial :
// https://www.youtube.com/watch?v=Fa2imVkcdqs&t=13s


import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { WebRequestService } from './web-request.service';
import { shareReplay, tap } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private readonly accessHeader:string  = 'x-access-token' ;
  private readonly refreshHeader:string = 'x-refresh-token';

  private readonly _idStorage:string  = 'user-id' ;
  private readonly accessStorage:string = 'access-token';
  private readonly refreshStorage:string = 'refresh-token';

  constructor(private webService:WebRequestService, private router:Router) { }

  // perform a login to the site with manager ID + password
  login(userID:string, password:string){
    return this.webService.post3('/managers/login', { userID, password }, {observe:'response'}).pipe(
      shareReplay(), // this wil prevernt running the login methid several time or something. I'll be honenst, I didn't untrstood it...
      tap((res:HttpResponse<any>) => {
        // authentication tokens are in the header of this response, we need to store them.

        let _id           = res.body._id;
        let accessTolken  = res.headers.get(this.accessHeader);
        let refreshTolken = res.headers.get(this.refreshHeader);

        //save session info
        this.setSession(_id, accessTolken, refreshTolken);

        console.log('loged in');  // TODO : DELETE
      })
    );
  };

  // logout of the system
  logout(){
    this.removeSession();
  }


  // -----------------------------------------------------getters & setters -----------------------------------------------------

  /**
   * get the access token from local storage
   */
  getAccessToken(){
      return localStorage.getItem(this.accessStorage);
  }

  /**
   * get the refresh token from local storage
   */
   getRefreshToken(){
    return localStorage.getItem(this.refreshStorage);
}



  /**
   *  set the value of the access token
   * @param accessToken the value of the access token to set
   */
  setAccessToken(accessToken:string){
    localStorage.setItem(this.accessStorage, accessToken);
  }

  /**
   *  set the value of the refresh token
   * @param refreshToken the value of the refresh token to set
   */
   setRefreshToken(refreshToken:string){
    localStorage.setItem(this.refreshStorage, refreshToken);
  }


  // ----------------------------------------------------- private methods -----------------------------------------------------

  // save authentication token of a user to the local storage
  private setSession(user_id:string, accessToken:string, refreshToken:string){
      localStorage.setItem(this._idStorage, user_id);
      localStorage.setItem(this.accessStorage, accessToken);
      localStorage.setItem(this.refreshStorage, refreshToken);
  }

  // remove info on the session from the local storage
  private removeSession(){
    localStorage.removeItem(this._idStorage);
    localStorage.removeItem(this.accessStorage);
    localStorage.removeItem(this.refreshStorage);
}
}
