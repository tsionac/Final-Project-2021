import { TestBed } from '@angular/core/testing';

import { WebRequestInterseptor } from './web-request.interseptor.service';

describe('WebRequestInterseptor', () => {
  let service: WebRequestInterseptor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebRequestInterseptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
