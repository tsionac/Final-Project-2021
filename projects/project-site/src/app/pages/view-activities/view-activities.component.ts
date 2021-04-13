import { Component, OnInit } from '@angular/core';
import { Activity } from '../../modules/Activity.module';
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

  constructor(private recordService:RecordService) { }

  ngOnInit(): void {

    //retruve all activities in the manager's company
    this.recordService.getRecords().subscribe((activities: Activity[]) => {
      this.activities = activities;
    })
  }

}
