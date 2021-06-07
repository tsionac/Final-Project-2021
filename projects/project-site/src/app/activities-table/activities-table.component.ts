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
    // this.filteredActivities = [];
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

  
}
