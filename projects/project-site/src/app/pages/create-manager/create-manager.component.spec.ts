import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateManagerComponent } from './create-manager.component';

describe('CreateManagerComponent', () => {
  let component: CreateManagerComponent;
  let fixture: ComponentFixture<CreateManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateManagerComponent ]
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
});
