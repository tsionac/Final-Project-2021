import { TestBed } from '@angular/core/testing';

import { CurrentEntityService } from './current-entity.service';

describe('CurrentEntityService', () => {
  let service: CurrentEntityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentEntityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
