import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NotificationsService, SimpleNotificationsModule } from 'angular2-notifications';
import { LoggerTestingModule } from 'ngx-logger/testing';

import { WebRequestInterseptor } from './web-request.interseptor.service';

describe('WebRequestInterseptor', () => {
  let service: WebRequestInterseptor;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [
      HttpClientTestingModule,
      RouterTestingModule,
      SimpleNotificationsModule.forRoot(),
      LoggerTestingModule,
    ],
      providers: [],});
    service = TestBed.inject(WebRequestInterseptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
