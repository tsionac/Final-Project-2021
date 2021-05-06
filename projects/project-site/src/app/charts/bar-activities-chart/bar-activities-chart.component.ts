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
  public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];

  constructor(private recordService:RecordService) { }

  ngOnInit() {
    this.recordService.getRecords().subscribe((activities: Activity[]) => {
      this.activities = activities;
    })
  
  }

}
