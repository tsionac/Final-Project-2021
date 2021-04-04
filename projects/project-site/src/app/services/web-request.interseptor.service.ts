// credit :
// https://www.youtube.com/watch?v=Fa2imVkcdqs&t=13s

import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { empty, Observable, throwError } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class WebRequestInterseptor implements HttpInterceptor {

  private readonly accessHeader:string  = 'x-access-token' ;
  private readonly refreshHeader:string = 'x-refresh-token';

  /**
   * evry tome there is a 401 error, we will try to refresh.
   * if faled, it wil also result in 401 so this fiels is here to avoid infinite loop.
   */
  private refreshingAccessToken:boolean = false;

  constructor(private authService:AuthenticationService) { }

  /**
   * we need to add the access token to any sensetive request in ordet to authenticate the user
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = this.addAuthenticationHeader(req);

    //handle the request by callid next()
    return next.handle(req).pipe(
      catchError((err:HttpErrorResponse) => {

        // TODO : do something with the error
        console.log(err);

        if(err.status === 401 && !this.refreshingAccessToken){
          // user is unautorised and this rror was not resulted form a failed refresh
          // this could be because the access token has expired. so we will try to refresh it
          // if this faled, perhaps refresh token has expired, ir was revoked. so we need to kogout so the user wi be forced to login again.

          return this.refreshAccessToken().pipe(
            switchMap(() => {
              req = this.addAuthenticationHeader(req);
              return next.handle(req);
            }),
            catchError((err:HttpErrorResponse) => {
              console.log('permition denied by the server!');
              this.authService.logout();

              return empty();
            })
          );
        }

        // any other error
        console.log('permition denied by the server! (2)');
        this.authService.logout();
        return throwError(err);
      })
    );
  };





  /**
   * add the the header of the given http request the acrss token, and return the modified request. if no acess token, return the request as is.
   * @param req the http reques to edit
   * @returns the (oerhaps) modufued http request
   */
  private addAuthenticationHeader(req: HttpRequest<any>) {

    // get access token
    const accessToken = this.authService.getAccessToken();

    // append the access token (if there is one) to the request's header
    if(accessToken){
      return req.clone({
        setHeaders:{
          'x-access-token': accessToken // unforchenetlly, readin this from the 'accessHeader' result in the header field literly be 'accessHeader' insted of the content...
        }
      });
    };

    return req; // no access token - no changes to be made.
  };

  /**
   * use the sored refresh token to refresh the access token to a new one
   */
  private refreshAccessToken(){
    // we need to send a request to the DB's api in order to refresh the accesstoken

    this.refreshingAccessToken = true; // refresh proccess started.
    return this.authService.getNewAccessToken().pipe(
      tap(() => {
        this.refreshingAccessToken = false; // refresh proccess ended successfully.
        console.log('Access token was refreshed!');
      })
    );

  };

}
