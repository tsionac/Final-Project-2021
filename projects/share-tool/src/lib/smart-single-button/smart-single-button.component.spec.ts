import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartSingleButtonComponent } from './smart-single-button.component';

describe('SmartSingleButtonComponent', () => {
  let component: SmartSingleButtonComponent;
  let fixture: ComponentFixture<SmartSingleButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmartSingleButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartSingleButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
