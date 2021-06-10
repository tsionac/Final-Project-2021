import { Component, OnInit } from '@angular/core';
import { Activity } from '../../modules/Activity.module';
import { AlertService } from '../../services/alert.service';
import { AuthenticationService } from '../../services/authentication.service';
import { RecordService } from '../../services/record.service';

@Component({
  selector: 'app-view-activities',
  templateUrl: './view-activities.component.html',
  styleUrls: ['./view-activities.component.css']
})
export class ViewActivitiesComponent implements OnInit {

  /**
   * A list of all the activities in the company
   */
   activities: Activity[];

    /**
   * A list of all the activities in the company
   */
    filteredActivities: Activity[];

    filterDateFrom;
    filterDateTo;

  constructor(private recordService:RecordService, private authService:AuthenticationService, private alert:AlertService) { }

  ngOnInit(): void {
    this.getEdits();

    this.alert.info("Leave the date field 'to' empty, in order to view activities until now!", undefined, undefined, 8000);
  }

  /**
   * get all the edits in manager's company
   */
  getEdits() {
    //retruve all activities in the manager's company
    this.recordService.getRecords().subscribe((activities: Activity[]) => {
      activities.forEach((activity:Activity) => {
        activity.editStart = new Date(activity.editStart);
        activity.editEnd = new Date(activity.editEnd);
      });

      this.activities = activities;
      this.saveCopy();
    })
  }

  /**
   * load all the edits to the filtered array
   */
  saveCopy() {
    this.filteredActivities = [];
    this.activities.forEach(activity => this.filteredActivities.push(activity));
  }

  checkFilter(filter){
    if (filter !== undefined && filter != ''){
      return true;
    } else {
      return false;
    }
  }

  /**
   * filter the records
   * @param userID an optional user name
   */
  filter(userID:string, componentID:String, actionID:string) {

    //reset previus filteres
    this.saveCopy();

    // apply new filters
    this.filteredActivities = this.filteredActivities.filter((activity:Activity) => {
      let ans:Boolean = true;

      if (this.checkFilter(userID)){
        //there is a requested filter for user
        ans = ans && (activity.userID == userID)
      }

      if (this.checkFilter(componentID)){
        //there is a requested filter for componentID
        ans = ans && (activity.componentID == componentID)
      }

      if (this.checkFilter(actionID)){
        //there is a requested filter for actionID
        ans = ans && (activity.actionID.toString() == actionID)
      }

      if (this.checkFilter(this.filterDateFrom)){
        //there is a requested filter for actionID
        ans = ans && (new Date(this.filterDateFrom).getTime() <= activity.editStart.getTime())
      }

      if (this.checkFilter(this.filterDateTo)){
        //there is a requested filter for actionID
        ans = ans && (new Date(this.filterDateTo).getTime() >= activity.editEnd.getTime())
      }

      return ans;
    });
  }

}
