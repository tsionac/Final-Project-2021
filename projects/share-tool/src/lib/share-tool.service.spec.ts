import { TestBed } from '@angular/core/testing';

import { ShareToolService } from './share-tool.service';

describe('ShareToolService', () => {
  let service: ShareToolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShareToolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
