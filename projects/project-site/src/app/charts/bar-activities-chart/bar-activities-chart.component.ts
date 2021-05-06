import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import {RecordService} from '../../services/record.service';
import { Activity } from '../../modules/Activity.module';


@Component({
  selector: 'app-bar-activities-chart',
  templateUrl: './bar-activities-chart.component.html',
  styleUrls: ['./bar-activities-chart.component.css']
})
export class BarActivitiesChartComponent implements OnInit {
  activities: Activity[];

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = Array(31).fill(0).map((_, i) => (i+1).toString());
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Sessions' }
  ];

  constructor(private recordService:RecordService) { }
  public iter_activities(){
    // for (const activity in this.activities){
    //   console.log(activity.toString());
    //   // var num_of_day = activity.editStart.getDate();

      

    // }
    
    

  }
  ngOnInit() {
    this.recordService.getRecords().subscribe((activities: Activity[]) => {
      this.activities = activities;
      this.iter_activities()
      
    })
  
  }

}
