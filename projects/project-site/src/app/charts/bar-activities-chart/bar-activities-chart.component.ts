import { Component, OnInit, Input } from '@angular/core';
import {ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label, SingleDataSet} from 'ng2-charts';
import {RecordService} from '../../services/record.service';
import { Activity } from '../../modules/Activity.module';



@Component({
  selector: 'app-bar-activities-chart',
  templateUrl: './bar-activities-chart.component.html',
  styleUrls: ['./bar-activities-chart.component.css']
})

export class BarActivitiesChartComponent implements OnInit {
  
  
  
  constructor(private recordService:RecordService) {}

  public activities_date = []
  // public day_per_month;


  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = Array(31).fill(0).map((_, i) => (i+1).toString());
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: ChartDataSets[] = [ { data: Array(31).fill(0), label:'sessions' } ];


  
   ngOnInit() {
    this.activities_date = this.recordService.getRecordByDayOfMonth()
    for (let i = 0; i<this.barChartData[0].data.length;i++){
      for(let j = 0; j<this.activities_date.length;j++){
        if (this.activities_date[j] == i){
            this.barChartData[0].data[i] = (<number>(this.barChartData[0].data[i]))++;  
        }
      }
      
    }


    // .subscribe(
    //  (startEdit_array) => {
    //    startEdit_array.forEach((date:Date)=>{
    //     this.activities_date.push(date);
    //    });
    //   console.log(this.activities_date)
    //   })
    // console.log(this.activities_date)
          // this.barChartData[0].data = [...this.barChartData[0].data]
   }



}
