import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartTextBoxComponent } from './smart-text-box.component';

describe('SmartTextBoxComponent', () => {
  let component: SmartTextBoxComponent;
  let fixture: ComponentFixture<SmartTextBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmartTextBoxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartTextBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
