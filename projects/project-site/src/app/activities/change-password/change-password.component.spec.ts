import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NotificationsService, SimpleNotificationsModule } from 'angular2-notifications';
import { LoggerTestingModule } from 'ngx-logger/testing';

import { ChangePasswordComponent } from './change-password.component';

describe('ChangePasswordComponent', () => {
  let component: ChangePasswordComponent;
  let fixture: ComponentFixture<ChangePasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        RouterTestingModule,
        SimpleNotificationsModule.forRoot(),
        LoggerTestingModule,
      ],
      declarations: [ ChangePasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });




  it('changePassword missing repeate', () => {
    expect(component.changePassword('1234567890', 'qwertyuiop', '')).toBeFalse();
  });

  it('changePassword missing new password', () => {
    expect(component.changePassword('1234567890', '', 'qwertyuiop')).toBeFalse();
  });

  it('changePassword new passwird too short', () => {
    expect(component.changePassword('1234567890', '12', '12')).toBeFalse();
  });

  it('changePassword paswrd repete do not match', () => {
    expect(component.changePassword('1234567890', 'qwertyuiop', '1234567890')).toBeFalse();
  });

});
