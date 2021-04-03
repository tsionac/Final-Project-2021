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
