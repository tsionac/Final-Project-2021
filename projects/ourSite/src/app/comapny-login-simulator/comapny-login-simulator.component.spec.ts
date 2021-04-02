import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComapnyLoginSimulatorComponent } from './comapny-login-simulator.component';

describe('ComapnyLoginSimulatorComponent', () => {
  let component: ComapnyLoginSimulatorComponent;
  let fixture: ComponentFixture<ComapnyLoginSimulatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComapnyLoginSimulatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComapnyLoginSimulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
