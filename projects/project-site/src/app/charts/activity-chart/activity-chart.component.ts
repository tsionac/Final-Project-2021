import { Component, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';

import {RecordService} from '../../services/record.service';
import { Activity } from '../../modules/Activity.module';


@Component({
  selector: 'app-activity-chart',
  templateUrl: './activity-chart.component.html',
  styleUrls: ['./activity-chart.component.css']
})
export class ActivityChartComponent implements OnInit {

  public mapOccUsers: Map<string, number>;//map of occurence of users
  public lenRecords:number = 0;

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: string[] = [];
  public pieChartData: number[]= [];
  public pieChartType: string = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public chartColors: any[] = [{ backgroundColor: [] }];

  constructor(private recordService:RecordService) {
    this.mapOccUsers = new Map<string, number>();
    recordService.getRecords().subscribe((act:Activity[])=>{
      this.lenRecords = act.length;
      for(let j = 0; j<this.lenRecords;j++){//initiate the map
        this.mapOccUsers.set(act[j].userID, 1)
      }

    });
  }

  nextNum(){
    return Math.floor(Math.random() * 150 + 100)
  }

  nextRgb(){
    return 'rgb(' + this.nextNum() + ',' + this.nextNum() + ',' + this.nextNum() + ')'
  }

  ngOnInit() {
    var dt = new Date();
    var month = dt.getMonth() +1;
    var year = dt.getFullYear();

    this.recordService.getRecords().subscribe((act:Activity[])=>{
      for(let i = 0; i<this.lenRecords;i++){
        var actDate = new Date(act[i].editStart);
        if (actDate.getMonth()+1 != month || actDate.getFullYear() != year){
          continue;
        }

        if (!(this.pieChartLabels.includes(act[i].userID))){
          this.pieChartLabels.push(act[i].userID.toString());
          this.chartColors[0].backgroundColor.push(this.nextRgb());
        }
        else{
          this.mapOccUsers.set(act[i].userID, this.mapOccUsers.get(act[i].userID)+1);
        }
      }
      this.mapOccUsers.forEach((value, key) => {
        this.pieChartData.push(<number>value);

      });
    })

  }

}
