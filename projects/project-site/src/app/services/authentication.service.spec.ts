import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NotificationsService, SimpleNotificationsModule } from 'angular2-notifications';
import { LoggerTestingModule } from 'ngx-logger/testing';

import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let passworShort = 'password is too short! use 8 characters or more!';

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [
      HttpClientTestingModule,
      RouterTestingModule,
      SimpleNotificationsModule.forRoot(),
      LoggerTestingModule,
    ]});
    service = TestBed.inject(AuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('validatePassword test empty', () => {
    expect(service.validatePassword('')).toEqual(passworShort);
  });

  it('validatePassword test 2', () => {
    expect(service.validatePassword('1')).toEqual(passworShort);
  });

  it('validatePassword test 3', () => {
    expect(service.validatePassword('123')).toEqual(passworShort);
  });

  it('validatePassword test length of 7', () => {
    expect(service.validatePassword('1234567')).toEqual(passworShort);
  });

  it('validatePassword test with letters', () => {
    expect(service.validatePassword('iuhig')).toEqual(passworShort);
  });




  it('setID & getID', () => {
    let id = 'hello!';
    service.setID(id);
    expect(service.getID()).toEqual(id);
  });

  it('setUserID & getUserID', () => {
    let id = '378346745932hnjk9867y9o';
    service.setUserID(id);
    expect(service.getUserID()).toEqual(id);
  });

  it('setAccessToken & getAccessToken', () => {
    let token = '378346745932hnjk9867y9o';
    service.setAccessToken(token);
    expect(service.getAccessToken()).toEqual(token);
  });

  it('setRefreshToken & getRefreshToken', () => {
    let token = '378346745932hnjk9867y9o';
    service.setRefreshToken(token);
    expect(service.getRefreshToken()).toEqual(token);
  });

  it('setSession', () => {
    let rtoken  = '378346745932hnjk9867y9o';
    let atoken  = '4tyr788u89y9y98yi8uhgiug';
    let userID  = 'leery jenkins';
    let id      = 'ekfcopiejfo84iehjfoi42ehfiu4kfg4i7yg';

    service.setSession(userID,id,atoken,rtoken);

    expect(service.getID()).toEqual(id);
    expect(service.getUserID()).toEqual(userID);
    expect(service.getAccessToken()).toEqual(atoken);
    expect(service.getRefreshToken()).toEqual(rtoken);
  });

  it('logout', () => {
    let rtoken  = '378346745932hnjk9867y9o';
    let atoken  = '4tyr788u89y9y98yi8uhgiug';
    let userID  = 'leery jenkins';
    let id      = 'ekfcopiejfo84iehjfoi42ehfiu4kfg4i7yg';

    service.setSession(userID,id,atoken,rtoken);

    expect(service.getID()).toEqual(id);
    expect(service.getUserID()).toEqual(userID);
    expect(service.getAccessToken()).toEqual(atoken);
    expect(service.getRefreshToken()).toEqual(rtoken);

    service.logout();

    expect(service.getID()).toBeNull();
    expect(service.getUserID()).toBeNull();
    expect(service.getAccessToken()).toBeNull();
    expect(service.getRefreshToken()).toBeNull();
  });

});
