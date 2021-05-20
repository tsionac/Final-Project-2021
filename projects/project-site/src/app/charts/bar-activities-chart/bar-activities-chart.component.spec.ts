import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarActivitiesChartComponent } from './bar-activities-chart.component';

describe('BarActivitiesChartComponent', () => {
  let component: BarActivitiesChartComponent;
  let fixture: ComponentFixture<BarActivitiesChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarActivitiesChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BarActivitiesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
