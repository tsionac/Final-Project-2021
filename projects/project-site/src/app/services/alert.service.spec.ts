import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { NotificationsService, SimpleNotificationsModule } from 'angular2-notifications';
import { LoggerConfig, LoggerModule, NGXLogger, NGXLoggerHttpService, NgxLoggerLevel, NGXMapperService, } from 'ngx-logger';
import { LoggerTestingModule } from 'ngx-logger/testing';

import { AlertService } from './alert.service';

describe('AlertService', () => {
  let service: AlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
      SimpleNotificationsModule.forRoot(),
      LoggerTestingModule,
      HttpClientTestingModule,
    ], providers: [
    ]});
    service = TestBed.inject(AlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
