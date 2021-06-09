import { TestBed } from '@angular/core/testing';

import { AppComponentServiceService } from './app-component-service.service';

describe('AppComponentServiceService', () => {
  let service: AppComponentServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppComponentServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getUser', () => {
    let user = 'ejkoiperjfp4fjpo';
    service.username = user;
    expect(service.getUser()).toEqual(user);
  });

  it('setUser', () => {
    let user = 'ejkoiperjfp4fjpo';
    service.setUser(user);
    expect(service.getUser()).toEqual(user);
  });
});
