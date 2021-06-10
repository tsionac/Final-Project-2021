import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { ActivitiesTableComponent } from './activities-table.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NotificationsService, SimpleNotificationsModule } from 'angular2-notifications';
import { LoggerTestingModule } from 'ngx-logger/testing';
import { Activity } from '../modules/Activity.module';
import { RecordService } from '../services/record.service';

describe('ActivitiesTableComponent', () => {
  let component: ActivitiesTableComponent;
  let fixture: ComponentFixture<ActivitiesTableComponent>;

  let user2filter = 'u1';
  let component2Filter = 'comp1';

  let from = new Date();
  from.setSeconds(from.getSeconds() - 1);

  let now = new Date();
  let now_p1 = new Date();
  now_p1.setSeconds(now_p1.getSeconds() + 1);
  let now_m1 = new Date();
  now_m1.setSeconds(now_m1.getSeconds() - 1);

  let to = new Date();
  to.setSeconds(to.getSeconds() + 2);

  let beforeFiltering: Activity[] = [];


  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivitiesTableComponent ],
      imports: [
        NoopAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
        HttpClientTestingModule,
        RouterTestingModule,
        LoggerTestingModule,
        SimpleNotificationsModule.forRoot(),
      ],
      providers: [RecordService,],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitiesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    //create dummy activites
    let activity1 = new Activity();
    let activity2 = new Activity();
    let activity3 = new Activity();
    let activity4 = new Activity();

    //populate dummy activites
    activity1.userID = user2filter;
    activity2.userID = user2filter;
    activity3.userID = "u3";
    activity4.userID = "u4";

    activity1.componentID = component2Filter;
    activity2.componentID = "comp2";
    activity3.componentID = component2Filter;
    activity4.componentID = "comp4";

    activity1.editStart = now;
    activity2.editStart = now;
    activity3.editStart = now_m1;
    activity4.editStart = now_m1;

    activity1.editEnd = now;
    activity2.editEnd = now_p1;
    activity3.editEnd = now_p1;
    activity4.editEnd = to;

    component.filteredActivities = [activity1, activity2, activity3, activity4];
    beforeFiltering = [];
    component.filteredActivities.forEach((activity:Activity) => beforeFiltering.push(activity) );
    expect(beforeFiltering.length).toEqual(4);
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });






  it('Filter by UserID', () => {
    //filter by the userName
    component.dofilter(user2filter, undefined);
    let afterFiltering = component.filteredActivities;

    //calculate what the resulat should be
    let shoudBe: Activity[] = [];
    beforeFiltering.forEach((activity:Activity) => { if(activity.userID==user2filter){shoudBe.push(activity);} } );

    expect(shoudBe).toEqual(jasmine.arrayWithExactContents(afterFiltering));  // the returned array should be the same as the expected one
  });



  it('Filter by componentID', () => {

    //filter by the userName
    component.dofilter(undefined, component2Filter);
    let afterFiltering = component.filteredActivities;

    //calculate what the resulat should be
    let shoudBe: Activity[] = [];
    beforeFiltering.forEach((activity:Activity) => { if(activity.componentID==component2Filter){shoudBe.push(activity);} } );

    expect(shoudBe).toEqual(jasmine.arrayWithExactContents(afterFiltering));  // the returned array should be the same as the expected one
  });


  it('Filter by  from date', () => {

    //filter by the userName
    component.filterDateTo  = undefined;
    component.filterDateFrom  = from;
    component.dofilter(undefined, undefined);
    let afterFiltering = component.filteredActivities;

    //calculate what the resulat should be
    let shoudBe: Activity[] = [];
    beforeFiltering.forEach((activity:Activity) => { if(from.getTime() <= activity.editStart.getTime()){shoudBe.push(activity);} } );

    expect(shoudBe).toEqual(jasmine.arrayWithExactContents(afterFiltering));  // the returned array should be the same as the expected one
  });

  it('Filter by  to date', () => {

    //filter by the userName
    component.filterDateTo  = to;
    component.filterDateFrom  = undefined;
    component.dofilter(undefined, undefined);
    let afterFiltering = component.filteredActivities;

    //calculate what the resulat should be
    let shoudBe: Activity[] = [];
    beforeFiltering.forEach((activity:Activity) => { if(to.getTime() >= activity.editStart.getTime()){shoudBe.push(activity);} } );

    expect(shoudBe).toEqual(jasmine.arrayWithExactContents(afterFiltering));  // the returned array should be the same as the expected one
  });

  it('Filter by date range', () => {

    //filter by the userName
    component.filterDateTo = to;
    component.filterDateFrom  = from;
    component.dofilter(undefined, undefined);
    let afterFiltering = component.filteredActivities;

    //calculate what the resulat should be
    let shoudBe: Activity[] = [];
    beforeFiltering.forEach((activity:Activity) => { if((to.getTime() >= activity.editStart.getTime()) && (from.getTime() <= activity.editStart.getTime())){shoudBe.push(activity);} } );

    expect(shoudBe).toEqual(jasmine.arrayWithExactContents(afterFiltering));  // the returned array should be the same as the expected one
  });

  it('Filter by from date and userID', () => {

    //filter by the userName
    component.filterDateTo = undefined;
    component.filterDateFrom  = from;
    component.dofilter(user2filter, undefined);
    let afterFiltering = component.filteredActivities;

    //calculate what the resulat should be
    let shoudBe: Activity[] = [];
    beforeFiltering.forEach((activity:Activity) => { if((activity.userID==user2filter) && (from.getTime() <= activity.editStart.getTime())){shoudBe.push(activity);} } );

    expect(shoudBe).toEqual(jasmine.arrayWithExactContents(afterFiltering));  // the returned array should be the same as the expected one
  });

  it('Filter by to date and userID', () => {

    //filter by the userName
    component.filterDateTo = to;
    component.filterDateFrom  = undefined;
    component.dofilter(user2filter, undefined);
    let afterFiltering = component.filteredActivities;

    //calculate what the resulat should be
    let shoudBe: Activity[] = [];
    beforeFiltering.forEach((activity:Activity) => { if((to.getTime() >= activity.editStart.getTime()) && (activity.userID==user2filter)){shoudBe.push(activity);} } );

    expect(shoudBe).toEqual(jasmine.arrayWithExactContents(afterFiltering));  // the returned array should be the same as the expected one
  });

  it('Filter by from date and componetID', () => {

    //filter by the userName
    component.filterDateTo = undefined;
    component.filterDateFrom  = from;
    component.dofilter(undefined, component2Filter);
    let afterFiltering = component.filteredActivities;

    //calculate what the resulat should be
    let shoudBe: Activity[] = [];
    beforeFiltering.forEach((activity:Activity) => { if((activity.componentID==component2Filter) && (from.getTime() <= activity.editStart.getTime())){shoudBe.push(activity);} } );

    expect(shoudBe).toEqual(jasmine.arrayWithExactContents(afterFiltering));  // the returned array should be the same as the expected one
  });

  it('Filter by to date and componetID', () => {

    //filter by the userName
    component.filterDateTo = to;
    component.filterDateFrom  = undefined;
    component.dofilter(undefined, component2Filter);
    let afterFiltering = component.filteredActivities;

    //calculate what the resulat should be
    let shoudBe: Activity[] = [];
    beforeFiltering.forEach((activity:Activity) => { if((to.getTime() >= activity.editStart.getTime()) && (activity.componentID==component2Filter)){shoudBe.push(activity);} } );

    expect(shoudBe).toEqual(jasmine.arrayWithExactContents(afterFiltering));  // the returned array should be the same as the expected one
  });

  it('Filter by from date and userID and componetID', () => {

    //filter by the userName
    component.filterDateTo = undefined;
    component.filterDateFrom  = from;
    component.dofilter(user2filter, component2Filter);
    let afterFiltering = component.filteredActivities;

    //calculate what the resulat should be
    let shoudBe: Activity[] = [];
    beforeFiltering.forEach((activity:Activity) => { if((activity.userID==user2filter) && (activity.componentID==component2Filter) && (from.getTime() <= activity.editStart.getTime())){shoudBe.push(activity);} } );

    expect(shoudBe).toEqual(jasmine.arrayWithExactContents(afterFiltering));  // the returned array should be the same as the expected one
  });

  it('Filter by to date and userID and componetID', () => {

    //filter by the userName
    component.filterDateTo = to;
    component.filterDateFrom  = undefined;
    component.dofilter(user2filter, component2Filter);
    let afterFiltering = component.filteredActivities;

    //calculate what the resulat should be
    let shoudBe: Activity[] = [];
    beforeFiltering.forEach((activity:Activity) => { if((activity.userID==user2filter) &&(to.getTime() >= activity.editStart.getTime()) && (activity.componentID==component2Filter)){shoudBe.push(activity);} } );

    expect(shoudBe).toEqual(jasmine.arrayWithExactContents(afterFiltering));  // the returned array should be the same as the expected one
  });



});
