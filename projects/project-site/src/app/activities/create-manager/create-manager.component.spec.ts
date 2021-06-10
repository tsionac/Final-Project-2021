import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NotificationsService, SimpleNotificationsModule } from 'angular2-notifications';
import { LoggerTestingModule } from 'ngx-logger/testing';

import { CreateManagerComponent } from './create-manager.component';

describe('CreateManagerComponent', () => {
  let component: CreateManagerComponent;
  let fixture: ComponentFixture<CreateManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        SimpleNotificationsModule.forRoot(),
        LoggerTestingModule,
      ],
      declarations: [ CreateManagerComponent ],
      providers: [],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });




  it('createManamager userID undefined', () => {
    expect(component.createManamager(undefined, 'comp!', '12345678')).toBeFalse();
  });

  it('createManamager userID empty', () => {
    expect(component.createManamager('', 'comp!', '12345678')).toBeFalse();
  });


  it('createManamager companyID undefined', () => {
    expect(component.createManamager('user', undefined, '12345678')).toBeFalse();
  });

  it('createManamager companyID empty', () => {
    expect(component.createManamager('user', '', '12345678')).toBeFalse();
  });



  it('createManamager password undefined', () => {
    expect(component.createManamager('user',  'comp!', undefined)).toBeFalse();
  });

  it('createManamager password empty', () => {
    expect(component.createManamager('user',  'comp!', '')).toBeFalse();
  });


  it('createManamager userID companyID are empty', () => {
    expect(component.createManamager('',  '', '12345678')).toBeFalse();
  });

  it('createManamager userID companyID are undefined', () => {
    expect(component.createManamager(undefined,  undefined, '12345678')).toBeFalse();
  });


  it('createManamager userID password are empty', () => {
    expect(component.createManamager('',  'comp!', '')).toBeFalse();
  });

  it('createManamager userID password are undefined', () => {
    expect(component.createManamager(undefined,  'comp!', undefined)).toBeFalse();
  });


  it('createManamager companyID password are empty', () => {
    expect(component.createManamager('user',  '', '')).toBeFalse();
  });

  it('createManamager companyID password are undefined', () => {
    expect(component.createManamager('user',  undefined, undefined)).toBeFalse();
  });


  it('createManamager all are empty', () => {
    expect(component.createManamager('',  '', '')).toBeFalse();
  });

  it('createManamageralld are undefined', () => {
    expect(component.createManamager(undefined,  undefined, undefined)).toBeFalse();
  });





  it('createManamager all, empty & undefined combinations 1', () => {
    expect(component.createManamager('',  undefined, '')).toBeFalse();
  });

  it('createManamager all, empty & undefined combinations 2', () => {
    expect(component.createManamager(undefined,  undefined, '')).toBeFalse();
  });

  it('createManamager all, empty & undefined combinations 3', () => {
    expect(component.createManamager('',  undefined, '123456789')).toBeFalse();
  });

  it('createManamager all, empty & undefined combinations 4', () => {
    expect(component.createManamager('user',  undefined, '')).toBeFalse();
  });





  it('createManamageralld password too short', () => {
    expect(component.createManamager('user',  'company', '123')).toBeFalse();
  });

});
