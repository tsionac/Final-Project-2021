// many parts of the user authentication in the frontend was havely based on this youtube tutorial :
// https://www.youtube.com/watch?v=Fa2imVkcdqs&t=13s


import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { WebRequestService } from './web-request.service';
import { shareReplay, tap } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  private readonly _idStorage:string  = 'user-id' ;
  private readonly accessStorage:string = 'x-access-token';
  private readonly refreshStorage:string = 'x-refresh-token';
  private readonly userIdStorage:string = 'user-name';

  private readonly storage = sessionStorage; //localStorage;




  constructor(private webService:WebRequestService, private router:Router, private alert:AlertService) {}

  // perform a login to the site with manager ID + password
  login(userID:string, password:string){
    return this.webService.post3('/managers/login', { userID, password }, {observe:'response'}).pipe(
      shareReplay(), // this wil prevernt running the login methid several time or something. I'll be honenst, I didn't untrstood it...
      tap((res:HttpResponse<any>) => {
        // authentication tokens are in the header of this response, we need to store them.
        let userName      = res.body.userID;
        let _id           = res.body._id;
        let accessTolken  = res.headers.get(this.accessStorage);
        let refreshTolken = res.headers.get(this.refreshStorage);

        //save session info
        this.setSession(userName, _id, accessTolken, refreshTolken);
      })
    );
  }

  changePassword(oldPassword:string, newPassword:string){
    return this.webService.patch3('/managers/changePassword', {oldPassword, newPassword}, {observe:'response'});
  }
  signup(userID:string, companyID:string, password:string) {
    return this.webService.post('/managers', { userID, companyID, password });
  }

  validatePassword(password:string) {
    if (password.length < 8){
      return 'password is too short! use 8 characters or more!';
    }

    return ''; //OK
  }

  // logout of the system
  logout(){
    this.removeSession();
  }

  // check of the user is alowed to access this page, if not, return the user to the login lage
  isAccessAllowed(){
    let uID = this.getUserID();

    if(uID  === undefined || uID === null || uID == ''){
        //user is not loged in... redirecting back to login page
        this.alert.warn('please login!');
        this.router.navigate(['/Login']);
    }
  }

  /**
   * refresh the access token with the refresh token
   */
  getNewAccessToken() {
    if(this.getRefreshToken() === null || this.getID() === null){
      return throwError('could not refresh aceess token - no values for refresh token or _id');
    }

    return this.webService.get2('/managers/me/access-token', {
      headers:{
        'x-refresh-token': this.getRefreshToken(),
        '_id': this.getID()
      },
      observe: 'response'
    }).pipe(tap((res: HttpResponse<any>) => {
      // save new acccess token to local storage
      this.setAccessToken(res.headers.get(this.accessStorage));
    }));
  }


  // -----------------------------------------------------getters & setters -----------------------------------------------------

  /**
   * get the access token from local storage
   */
  getAccessToken(){
      return this.storage.getItem(this.accessStorage);
  }

  /**
   * get the refresh token from local storage
   */
  getRefreshToken(){
    return this.storage.getItem(this.refreshStorage);
  }

  /**
   * get the _id from local storage
   */
   getID(){
    return this.storage.getItem(this._idStorage);
  }

  public getUserID(){
     return this.storage.getItem(this.userIdStorage);
  }


  // -----------------------

  /**
   *  set the value of the access token
   * @param accessToken the value of the access token to set
   */
  setAccessToken(accessToken:string){
    this.storage.setItem(this.accessStorage, accessToken);
  }

  /**
   *  set the value of the refresh token
   * @param refreshToken the value of the refresh token to set
   */
   setRefreshToken(refreshToken:string){
    this.storage.setItem(this.refreshStorage, refreshToken);
  }

  /**
   *  set the value of the _id
   * @param _id the value of the _id to set
   */
   setID(_id:string){
    this.storage.setItem(this._idStorage, _id);
  }

  /**
   *  set the value of the userID
   * @param username the value of the userID to set
   */
   setUserID(username:string){
    this.storage.setItem(this.userIdStorage, username);
  }


  // ----------------------------------------------------- private methods -----------------------------------------------------

  // save authentication token of a user to the local storage
  setSession(userNamer:string, user_id:string, accessToken:string, refreshToken:string){
    this.setUserID(userNamer);
    this.setID(user_id);
    this.setAccessToken(accessToken);
    this.setRefreshToken(refreshToken);
  }

  // remove info on the session from the local storage
  private removeSession(){
    this.storage.removeItem(this.userIdStorage);
    this.storage.removeItem(this._idStorage);
    this.storage.removeItem(this.accessStorage);
    this.storage.removeItem(this.refreshStorage);
}
}
