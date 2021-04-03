// credit :
// https://www.youtube.com/watch?v=Fa2imVkcdqs&t=13s

import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class WebRequestInterseptor implements HttpInterceptor {

  private readonly accessHeader:string  = 'x-access-token' ;
  private readonly refreshHeader:string = 'x-refresh-token';

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
          accessHeader: accessToken
        }
      });
    };

    return req; // no access token - no changes to be made.
  };


}
