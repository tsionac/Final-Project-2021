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

  it('setCurrentEntity & getCurrentEntity', () => {
    let entity = 'entity78';
    service.setCurrentEntity(entity)
    expect(service.getCurrentEntity()).toEqual(entity);
  });

  it('clear', () => {
    let entity = 'entity78';
    service.setCurrentEntity(entity)
    expect(service.getCurrentEntity()).toEqual(entity);

    service.clear();
    expect(service.getCurrentEntity()).toBeNull();
  });

});
