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



  constructor(private recordService:RecordService) {
  }
  

  public activities_date:number[] = []
  // public day_per_month;


  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: ChartDataSets[] = [ { data: Array(31).fill(0), label:'sessions',  backgroundColor: [] } ];
  public chartbarColors: any[] = [{ backgroundColor: [] }];


  nextNum(){
    return Math.floor(Math.random() * 150 + 100)
  }

  nextRgb(){
    return 'rgb(' + this.nextNum() + ',' + this.nextNum() + ',' + this.nextNum() + ')'
  }

  refreshBarChart(act:Activity[], month:number, year:number, data) {
    for(let i = 0; i<act.length;i++){
      var actDate = new Date(act[i].editStart);
      if (actDate.getMonth()+1 != month || actDate.getFullYear() != year){
        continue;
      }

      (data[(new Date(act[i].editStart).getDate())-1])++;
      this.chartbarColors[0].backgroundColor.push(this.nextRgb());

      

    }
  }



  ngOnInit() {
    var dt = new Date();
    var month = dt.getMonth() +1;
    var year = dt.getFullYear();
    var daysInMonth = new Date(year, month, 0).getDate();
    // console.log("dt: " + month + " " + String(dt))

    var data = []
    data.length = daysInMonth;
    data.fill(0);

    this.recordService.getRecords().subscribe((act:Activity[])=>{
      this.refreshBarChart(act, month, year, data); 
      this.barChartData[0] = { data: data, label:'sessions per month', backgroundColor: this.chartbarColors[0].backgroundColor};
      this.barChartLabels = Array(daysInMonth).fill(0).map((_, i) => (i+1).toString());

    })

  }

}
