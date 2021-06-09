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
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });




  it('Filter by UserID', () => {

    let user2Filter = 'u1';

    //create dummy activites
    let activity1 = new Activity();
    let activity2 = new Activity();
    let activity3 = new Activity();
    let activity4 = new Activity();

    //populate dummy activites
    activity1.userID = user2Filter;
    activity2.userID = user2Filter;
    activity3.userID = "u3";
    activity4.userID = "u4";

    activity1.componentID = "comp1";
    activity2.componentID = "comp2";
    activity3.componentID = "comp1";
    activity4.componentID = "comp4";

    activity1.editStart = new Date();
    activity2.editStart = new Date();
    activity3.editStart = new Date();
    activity4.editStart = new Date();

    activity1.editEnd = new Date();
    activity2.editEnd = new Date();
    activity3.editEnd = new Date();
    activity4.editEnd = new Date();

    component.filteredActivities = [activity1, activity2, activity3, activity4];
    let beforeFiltering: Activity[] = [];
    component.filteredActivities.forEach((activity:Activity) => beforeFiltering.push(activity) );

    //get an exsisting userName
    expect(beforeFiltering.length).toBeGreaterThan(0); //there is an elemet to filter

    //filter by the userName
    component.dofilter(user2Filter, undefined);
    let afterFiltering = component.filteredActivities;

    //calculate what the resulat should be
    let shoudBe: Activity[] = [];
    beforeFiltering.forEach((activity:Activity) => { if(activity.userID==user2Filter){shoudBe.push(activity);} } );

    expect(shoudBe.length).toBeLessThan(beforeFiltering.length);              // filtered some items
    expect(shoudBe).toEqual(jasmine.arrayWithExactContents(afterFiltering));  // the returned array should be the same as the expected one
  });



  it('Filter by componentID', () => {

    let component2Filter = 'comp1';

    //create dummy activites
    let activity1 = new Activity();
    let activity2 = new Activity();
    let activity3 = new Activity();
    let activity4 = new Activity();

    //populate dummy activites
    activity1.userID = "u1";
    activity2.userID = "u1";
    activity3.userID = "u3";
    activity4.userID = "u4";

    activity1.componentID = component2Filter;
    activity2.componentID = "comp2";
    activity3.componentID = component2Filter;
    activity4.componentID = "comp4";

    activity1.editStart = new Date();
    activity2.editStart = new Date();
    activity3.editStart = new Date();
    activity4.editStart = new Date();

    activity1.editEnd = new Date();
    activity2.editEnd = new Date();
    activity3.editEnd = new Date();
    activity4.editEnd = new Date();

    component.filteredActivities = [activity1, activity2, activity3, activity4];
    let beforeFiltering: Activity[] = [];
    component.filteredActivities.forEach((activity:Activity) => beforeFiltering.push(activity) );

    //get an exsisting userName
    expect(beforeFiltering.length).toBeGreaterThan(0); //there is an elemet to filter

    //filter by the userName
    component.dofilter(undefined, component2Filter);
    let afterFiltering = component.filteredActivities;

    //calculate what the resulat should be
    let shoudBe: Activity[] = [];
    beforeFiltering.forEach((activity:Activity) => { if(activity.componentID==component2Filter){shoudBe.push(activity);} } );

    expect(shoudBe.length).toBeLessThan(beforeFiltering.length);              // filtered some items
    expect(shoudBe).toEqual(jasmine.arrayWithExactContents(afterFiltering));  // the returned array should be the same as the expected one
  });


  it('Filter by and userID componentID', () => {

    let user2filter = 'u1';
    let component2Filter = 'comp1';

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

    activity1.editStart = new Date();
    activity2.editStart = new Date();
    activity3.editStart = new Date();
    activity4.editStart = new Date();

    activity1.editEnd = new Date();
    activity2.editEnd = new Date();
    activity3.editEnd = new Date();
    activity4.editEnd = new Date();

    component.filteredActivities = [activity1, activity2, activity3, activity4];
    let beforeFiltering: Activity[] = [];
    component.filteredActivities.forEach((activity:Activity) => beforeFiltering.push(activity) );

    //get an exsisting userName
    expect(beforeFiltering.length).toBeGreaterThan(0); //there is an elemet to filter

    //filter by the userName
    component.dofilter(user2filter, component2Filter);
    let afterFiltering = component.filteredActivities;

    //calculate what the resulat should be
    let shoudBe: Activity[] = [];
    beforeFiltering.forEach((activity:Activity) => { if((activity.componentID==component2Filter) &&  (activity.userID==user2filter)){shoudBe.push(activity);} } );

    expect(shoudBe.length).toBeLessThan(beforeFiltering.length);              // filtered some items
    expect(shoudBe).toEqual(jasmine.arrayWithExactContents(afterFiltering));  // the returned array should be the same as the expected one
  });
});
