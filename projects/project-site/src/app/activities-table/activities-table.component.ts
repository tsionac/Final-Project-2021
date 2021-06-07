import { Component } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { Activity } from '../modules/Activity.module';
import { AlertService } from '../services/alert.service';
import { RecordService } from '../services/record.service';



@Component({
  selector: 'app-activities-table',
  templateUrl: './activities-table.component.html',
  styleUrls: ['./activities-table.component.css']
})

export class ActivitiesTableComponent {
  public ELEMENT_DATA: Activity[] = [];

   /**
   * A list of all the activities in the company
   */
    // activities: Activity[];

  filteredActivities: Activity[];

  filterDateFrom;
  filterDateTo;
  displayedColumns: string[];
  dataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */

  constructor(private recordService:RecordService, private alert:AlertService) {

   
  }
  ngOnInit(): void {
    this.displayedColumns = ['UserID', 'ComponentID', 'Start Date', 'End Date'];
    this.filteredActivities = [];
    this.getEdits();
    this.alert.info("Leave the date field 'to' empty, in order to view activites until now!", undefined, undefined, 8000);
  }

  
  /**
   * load all the edits to the filtered array
   */
   saveCopy() {
    this.filteredActivities = [];
    this.ELEMENT_DATA.forEach(activity => this.filteredActivities.push(activity));
    this.dataSource =  new MatTableDataSource(this.filteredActivities);
  }
  /**
   * get all the edits in manager's company
   */
   getEdits() {
     console.log("here")
    //retruve all activities in the manager's company
    this.recordService.getRecords().subscribe((activities: Activity[]) => {
      activities.forEach((activity:Activity) => {
        activity.editStart = new Date(activity.editStart);
        activity.editEnd = new Date(activity.editEnd);
      });

      this.ELEMENT_DATA = activities;
      this.saveCopy();
    })
  }

  
  /**
   * filter the recods
   * @param userID an optional user name
   */
   filter(userID:string, componentID:String) {

    //reset previus filteres
    this.saveCopy();

    // apply new filters
    this.filteredActivities = this.filteredActivities.filter((activity:Activity) => {
      let ans:Boolean = true;

      if (userID !== undefined && userID != ''){
        //tere is a requested filter for user
        ans = ans && (activity.userID == userID)
      }

      if (componentID !== undefined && componentID != ''){
        //tere is a requested filter for componentID
        ans = ans && (activity.componentID == componentID)
      }

      if (this.filterDateFrom !== undefined && this.filterDateFrom != ''){
        //tere is a requested filter for actionID
        ans = ans && (new Date(this.filterDateFrom).getTime() <= activity.editStart.getTime())
      }

      if (this.filterDateTo !== undefined && this.filterDateTo != ''){
        //tere is a requested filter for actionID
        ans = ans && (new Date(this.filterDateTo).getTime() >= activity.editEnd.getTime())
      }
      return ans;

    }
    );
    this.dataSource =  new MatTableDataSource(this.filteredActivities);
  }

  
}
