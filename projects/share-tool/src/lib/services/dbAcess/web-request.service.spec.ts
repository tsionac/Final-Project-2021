import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { WebRequestService } from './web-request.service';

describe('WebRequestService', () => {
  let service: WebRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [ HttpClientTestingModule ],});
    service = TestBed.inject(WebRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
