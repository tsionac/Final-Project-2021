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
  public lenUsers:number = 0;
  
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
      this.lenUsers = act.length;
      for(let j = 0; j<this.lenUsers;j++){//initiate the map
        this.mapOccUsers.set(act[j].userID, 1)
      }

    });
  }

  ngOnInit() {
    this.recordService.getRecords().subscribe((act:Activity[])=>{
      var colors = ['rgb(127, 255, 212)', 'rgb(255,127,80)', 'rgb(100,149,237)', 'rgb(0,191,255)', 'rgb(255,192,203)'];
      // console.log(act[0].userID)
      for(let i = 0; i<this.lenUsers;i++){
        if (!(this.pieChartLabels.includes(act[i].userID))){
          this.pieChartLabels.push(act[i].userID.toString());
          this.chartColors[0].backgroundColor.push(colors[Math.floor(Math.random() * colors.length)]);
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
