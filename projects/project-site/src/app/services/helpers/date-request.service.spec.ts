import { TestBed } from '@angular/core/testing';

import { DateRequestService } from './date-request.service';

describe('DateRequestService', () => {
  let service: DateRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('return the curent date', () => {
    expect(service.getCurrentTime()).toEqual(new Date());
  });
});
