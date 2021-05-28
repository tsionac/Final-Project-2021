import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartButtonComponent } from './smart-button.component';

describe('SmartButtonComponent', () => {
  let component: SmartButtonComponent;
  let fixture: ComponentFixture<SmartButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmartButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
